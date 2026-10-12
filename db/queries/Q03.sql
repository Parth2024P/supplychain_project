-- ============================================================================
-- Query ID: Q03
-- Problem Statement: Pending critical requests with no later shipment of the same item to that camp
-- Concepts Tested: Anti-join / Correlated Subquery with NOT EXISTS, Date comparison
-- Expected Output Columns: request_id, request_date, camp_id, camp_name, item_id, item_name, urgency
-- ============================================================================
-- Hint 1: Filter supply_request for urgency = 'critical'.
-- Hint 2: Use NOT EXISTS to verify there are no matching shipments to the same camp on or after the request date.

-- Stub: Replace with your analytical query solution
SELECT 'TODO' AS not_attempted;
