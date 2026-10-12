-- ============================================================================
-- Query ID: Q05
-- Problem Statement: Top 3 donors per item category by total quantity delivered
-- Concepts Tested: Window Functions (DENSE_RANK / RANK), PARTITION BY, Common Table Expression (CTE)
-- Expected Output Columns: category, donor_id, donor_name, total_quantity, category_rank
-- ============================================================================
-- Hint 1: First aggregate the total delivered quantity per category and donor in a CTE.
-- Hint 2: Apply DENSE_RANK() OVER (PARTITION BY category ORDER BY total_quantity DESC) and filter rank <= 3.

-- Stub: Replace with your analytical query solution
SELECT 'TODO' AS not_attempted;
