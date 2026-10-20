# Disaster Relief Supply Chain Database

A database management systems project for modelling and analysing disaster-relief logistics. The project uses PostgreSQL to manage relief camps, displaced families, volunteers, donors, shipments, supply requests, and camp inventory.

The repository includes:

- A normalized PostgreSQL 16 database schema
- Deterministic seed data for repeatable demonstrations
- SQL exercises covering analytical queries, triggers, routines, transactions, and indexes
- A Python test harness with expected CSV results for Q01-Q20
- A browser-based SQL Lab and review interface built with React, TypeScript, Vite, and PGlite
- Documentation for the ER model, normalization, transactions, indexing, and viva preparation

## Project location

The implementation is contained in [`dbms/`](./dbms/). Run database and UI commands from that directory.

## Requirements

### Database workflow

- Docker Desktop with Docker Compose
- GNU Make, or the equivalent commands described in [`dbms/README.md`](./dbms/README.md)
- Python 3

### Browser review UI

- Node.js 20 or a compatible recent Node.js release
- npm

## Quick start: PostgreSQL database

Open a terminal in the project directory:

```powershell
cd dbms
docker compose up -d
make reset
```

The PostgreSQL container runs with these local development defaults:

| Setting | Value |
| --- | --- |
| Database | `disaster_relief` |
| User | `postgres` |
| Password | `postgres` |
| Host port | `5432` |

Run the query test harness:

```powershell
make test
```

Open an interactive PostgreSQL session:

```powershell
make psql
```

Stop the database when finished:

```powershell
make down
```

> `make reset` recreates the schema and reloads the seed data. Use it only with this local development database because it is destructive.

## Quick start: browser review UI

The easiest way to review the project without installing PostgreSQL is the client-side review interface. It creates the database in browser memory using PGlite.

```powershell
cd dbms\ui\client
npm ci
npm run dev
```

Open the local URL printed by Vite and select **Start review walkthrough**.

Useful client commands:

```powershell
npm run test:demo  # Verify all 20 queries and reference results
npm run build      # Build the standalone UI
npm run preview    # Preview the production build
```

The browser database is temporary: reloading the page resets changes. The browser demo is intended for review and classroom presentation; it is not a replacement for testing concurrent PostgreSQL sessions.

For a suggested presentation flow, see [`dbms/docs/review-demo.md`](./dbms/docs/review-demo.md).

## Repository structure

```text
.
├── README.md
└── dbms/
    ├── Makefile
    ├── docker-compose.yml
    ├── db/
    │   ├── 00_roles.sql
    │   ├── 01_schema.sql
    │   ├── 02_seed.sql
    │   ├── 03_seed_bulk.sql
    │   ├── queries/          # Q01-Q20 analytical SQL exercises
    │   ├── routines/         # F01-F04 stored routine exercises
    │   ├── triggers/         # T01-T05 trigger exercises
    │   ├── transactions/     # Concurrency and rollback scenarios
    │   └── indexing/         # Slow-query benchmark scripts
    ├── docs/                 # Design, review, and coursework notes
    ├── scripts/              # Seed and exercise generation utilities
    ├── tests/
    │   ├── runner.py
    │   └── expected/         # Reference outputs for Q01-Q20
    └── ui/
        ├── client/           # React/Vite browser review application
        └── server/           # Express API for the PostgreSQL-backed UI
```

## Database concepts demonstrated

- Relational modelling and entity relationships
- Weak entities and composite keys
- Functional dependencies and BCNF normalization
- Primary keys, foreign keys, check constraints, and cascading behaviour
- Analytical SQL, joins, aggregation, subqueries, set operations, views, and materialized views
- Stored functions and procedures
- Triggers for enforcing or propagating business rules
- Transaction isolation, savepoints, row locking, deadlocks, and serialization failures
- Query planning and index evaluation with `EXPLAIN (ANALYZE, BUFFERS)`
- Database roles and access-control exercises

## Useful documentation

- [`dbms/README.md`](./dbms/README.md) - detailed setup, Makefile targets, coursework workflow, and directory guide
- [`dbms/PROJECT_ANALYSIS.md`](./dbms/PROJECT_ANALYSIS.md) - project architecture and current implementation notes
- [`dbms/docs/er-diagram.md`](./dbms/docs/er-diagram.md) - entity-relationship model
- [`dbms/docs/normalization.md`](./dbms/docs/normalization.md) - normalization and decomposition
- [`dbms/docs/review-demo.md`](./dbms/docs/review-demo.md) - browser review and presentation guide
- [`dbms/docs/transaction-log.md`](./dbms/docs/transaction-log.md) - transaction experiment worksheet
- [`dbms/docs/index-study.md`](./dbms/docs/index-study.md) - indexing benchmark worksheet
- [`dbms/docs/viva-notes.md`](./dbms/docs/viva-notes.md) - viva preparation notes

## License

No license file is currently included. Unless a license is added, the project should be treated as private coursework material.
