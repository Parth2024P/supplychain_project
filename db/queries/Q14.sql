-- ============================================================================
-- Query ID: Q14
-- Problem Statement: Total shelter capacity vs registered members per camp
-- Concepts Tested: Aggregating multiple 1:N dimensions independently via CTEs before joining
-- Expected Output Columns: camp_id, camp_name, total_shelter_capacity, total_registered_members, capacity_difference
-- ============================================================================
-- Hint 1: Avoid Cartesian fanout: compute SUM(unit_capacity) in one CTE and COUNT(member_no) in a separate CTE.
-- Hint 2: Join both CTEs back to relief_camp to calculate the net difference.

-- Stub: Replace with your analytical query solution
SELECT 'TODO' AS not_attempted;
