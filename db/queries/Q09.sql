-- ============================================================================
-- Query ID: Q09
-- Problem Statement: Running total of delivered quantity per camp over time
-- Concepts Tested: Window Function SUM(...) OVER (PARTITION BY ... ORDER BY ...)
-- Expected Output Columns: camp_id, camp_name, shipment_id, shipment_date, quantity_sent, running_total_quantity
-- ============================================================================
-- Hint 1: Join relief_camp, shipment, and shipment_line filtering for delivered shipments.
-- Hint 2: Use SUM(quantity_sent) OVER (PARTITION BY camp_id ORDER BY shipment_date, shipment_id) for cumulative progression.

-- Stub: Replace with your analytical query solution
SELECT 'TODO' AS not_attempted;
