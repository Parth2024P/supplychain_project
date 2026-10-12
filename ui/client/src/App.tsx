import { useState, useEffect, useRef } from 'react';
import { Database, Play, RefreshCw, FileText, CheckCircle2, XCircle, Clock } from 'lucide-react';
import mermaid from 'mermaid';

interface QueryMeta {
  id: string;
  filename: string;
  title: string;
  concepts: string;
  expectedColumns: string;
  sql: string;
  isStub: boolean;
}

interface QueryResult {
  id: string;
  success: boolean;
  fields?: string[];
  rows?: any[];
  rowCount?: number;
  executionTimeMs?: number;
  error?: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'sql-lab' | 'er-diagram'>('sql-lab');
  const [queries, setQueries] = useState<QueryMeta[]>([]);
  const [selectedQueryId, setSelectedQueryId] = useState<string>('Q01');
  const [testStatuses, setTestStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [running, setRunning] = useState<boolean>(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [erContent, setErContent] = useState<string>('');
  const mermaidRef = useRef<HTMLDivElement>(null);

  // Fetch queries and statuses
  const fetchData = async () => {
    setLoading(true);
    try {
      const qRes = await fetch('/api/queries');
      const qData = await qRes.json();
      setQueries(qData);

      const tRes = await fetch('/api/tests/status');
      const tData = await tRes.json();
      if (tData.statuses) {
        setTestStatuses(tData.statuses);
      }
    } catch (e) {
      console.error('Error fetching queries:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchErDiagram = async () => {
    try {
      const res = await fetch('/api/docs/er-diagram');
      const data = await res.json();
      setErContent(data.content || '');
    } catch (e) {
      console.error('Error fetching ER diagram:', e);
    }
  };

  useEffect(() => {
    fetchData();
    fetchErDiagram();
  }, []);

  // Initialize mermaid when er-diagram tab is active
  useEffect(() => {
    if (activeTab === 'er-diagram' && erContent && mermaidRef.current) {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      // Extract mermaid diagram between ```mermaid ... ```
      const match = erContent.match(/```mermaid([\s\S]*?)```/);
      if (match) {
        const diagramCode = match[1].trim();
        mermaid.render('er-mermaid-svg', diagramCode).then(res => {
          if (mermaidRef.current) {
            mermaidRef.current.innerHTML = res.svg;
          }
        }).catch(err => {
          console.error('Mermaid render error:', err);
        });
      }
    }
  }, [activeTab, erContent]);

  const activeQuery = queries.find(q => q.id === selectedQueryId) || queries[0];

  const handleRunQuery = async () => {
    if (!activeQuery) return;
    setRunning(true);
    setResult(null);
    try {
      const res = await fetch(`/api/queries/${activeQuery.id}/run`, {
        method: 'POST',
      });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({
        id: activeQuery.id,
        success: false,
        error: e.message || 'Execution failed',
      });
    } finally {
      setRunning(false);
    }
  };

  const getStatusClass = (id: string) => {
    const status = testStatuses[id];
    if (status === 'PASS') return 'status-badge pass';
    if (status === 'FAIL') return 'status-badge fail';
    return 'status-badge not-attempted';
  };

  const getStatusText = (id: string) => {
    return testStatuses[id] || 'NOT ATTEMPTED';
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="app-title-group">
          <div className="logo-badge">DBMS Lab</div>
          <div>
            <div className="app-title">Disaster Relief Logistics Database</div>
            <div className="app-subtitle">PostgreSQL 16 Engine • B.Tech CSE Course Project</div>
          </div>
        </div>

        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'sql-lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('sql-lab')}
          >
            <Database size={16} />
            SQL Lab (Q01 – Q20)
          </button>
          <button
            className={`nav-tab ${activeTab === 'er-diagram' ? 'active' : ''}`}
            onClick={() => setActiveTab('er-diagram')}
          >
            <FileText size={16} />
            ER Diagram & Architecture
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      {activeTab === 'sql-lab' ? (
        <div className="main-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">Analytical Queries</span>
              <button
                className="refresh-btn"
                title="Reload files & test status"
                onClick={fetchData}
                disabled={loading}
              >
                <RefreshCw size={14} className={loading ? 'spin' : ''} />
              </button>
            </div>

            <div className="query-list">
              {queries.map(q => (
                <div
                  key={q.id}
                  className={`query-item ${selectedQueryId === q.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedQueryId(q.id);
                    setResult(null);
                  }}
                >
                  <div className="query-item-header">
                    <span className="query-id">{q.id}</span>
                    <span className={getStatusClass(q.id)}>
                      {getStatusText(q.id)}
                    </span>
                  </div>
                  <div className="query-item-title">{q.title}</div>
                </div>
              ))}
            </div>
          </aside>

          {/* Workspace */}
          <main className="workspace">
            {activeQuery && (
              <>
                <div className="workspace-header">
                  <div className="query-meta-group">
                    <h2 className="query-full-title">
                      {activeQuery.id}: {activeQuery.title}
                    </h2>
                    <div className="query-concepts">
                      Concepts: {activeQuery.concepts}
                    </div>
                  </div>

                  <button
                    className="run-btn"
                    onClick={handleRunQuery}
                    disabled={running}
                  >
                    <Play size={16} fill="white" />
                    {running ? 'Executing...' : 'Run Query'}
                  </button>
                </div>

                <div className="split-pane">
                  {/* SQL Code View */}
                  <div className="code-viewer-container">
                    <div className="pane-label">
                      Current SQL ({activeQuery.filename} on disk)
                    </div>
                    <pre className="code-block">{activeQuery.sql}</pre>
                  </div>

                  {/* Results Pane */}
                  <div className="results-container">
                    <div className="results-header">
                      <span className="results-title">Execution Results</span>
                      {result && result.success && (
                        <div className="results-stats">
                          <span>Rows: <strong className="stat-tag">{result.rowCount}</strong></span>
                          <span>Time: <strong className="stat-tag">{result.executionTimeMs} ms</strong></span>
                        </div>
                      )}
                    </div>

                    {running && (
                      <div className="empty-state">
                        <Clock size={32} className="spin" />
                        <div>Executing query against PostgreSQL 16...</div>
                      </div>
                    )}

                    {!running && !result && (
                      <div className="empty-state">
                        <Play size={32} />
                        <div>Click "Run Query" to execute {activeQuery.id}</div>
                      </div>
                    )}

                    {!running && result && !result.success && (
                      <div className="error-banner">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: 600 }}>
                          <XCircle size={18} />
                          Query Execution Error
                        </div>
                        <div>{result.error}</div>
                      </div>
                    )}

                    {!running && result && result.success && (
                      <div className="table-wrapper">
                        {result.rows && result.rows.length > 0 ? (
                          <table className="data-table">
                            <thead>
                              <tr>
                                {result.fields?.map(f => (
                                  <th key={f}>{f}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {result.rows.map((row, idx) => (
                                <tr key={idx}>
                                  {result.fields?.map(f => (
                                    <td key={f}>{row[f] !== null && row[f] !== undefined ? String(row[f]) : 'NULL'}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="empty-state">
                            <CheckCircle2 size={32} color="var(--accent-green)" />
                            <div>Query returned 0 rows successfully.</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      ) : (
        /* ER Diagram View */
        <div className="er-view-container">
          <div className="mermaid-diagram-card">
            <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Authoritative Entity-Relationship Diagram</h2>
            <div ref={mermaidRef}>Loading Mermaid Diagram...</div>
          </div>
        </div>
      )}
    </div>
  );
}
