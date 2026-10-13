-- ==============================================================================
-- 3AL 7IT - Database Migration: Sports & Discipline Standardization
-- ==============================================================================
-- INSTRUCTIONS:
-- 1. Open your Supabase Dashboard: https://supabase.com/dashboard/project/<your-project-id>/sql
-- 2. Paste and run this script in the SQL Editor.
-- 3. This script standardizes subcategory and discipline values to canonical French
--    labels ("Boxe", "Sports Auto", "Football", "Basketball", "MMA", "Tennis")
--    ensuring perfect synchronization between the Dashboard and Storefront.
-- ==============================================================================

-- STEP 1: Ensure columns exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS discipline TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS nested_sport TEXT;

-- STEP 2: Standardize Boxing / Boxe -> "Boxe"
UPDATE public.products
SET 
  subcategory = 'Boxe',
  discipline = 'Boxe',
  nested_sport = 'Boxe'
WHERE 
  LOWER(TRIM(subcategory)) IN ('boxing', 'boxe', 'boxeur')
  OR LOWER(TRIM(discipline)) IN ('boxing', 'boxe', 'boxeur')
  OR LOWER(TRIM(nested_sport)) IN ('boxing', 'boxe', 'boxeur');

-- STEP 3: Standardize Motorsport / F1 / Racing -> "Sports Auto"
UPDATE public.products
SET 
  subcategory = 'Sports Auto',
  discipline = 'Sports Auto',
  nested_sport = 'Sports Auto'
WHERE 
  LOWER(TRIM(subcategory)) IN ('motorsport', 'motorsports', 'f1', 'formula 1', 'racing', 'sports auto', 'sport auto')
  OR LOWER(TRIM(discipline)) IN ('motorsport', 'motorsports', 'f1', 'formula 1', 'racing', 'sports auto', 'sport auto')
  OR LOWER(TRIM(nested_sport)) IN ('motorsport', 'motorsports', 'f1', 'formula 1', 'racing', 'sports auto', 'sport auto');

-- STEP 4: Standardize Football / Foot -> "Football"
UPDATE public.products
SET 
  subcategory = 'Football',
  discipline = 'Football',
  nested_sport = 'Football'
WHERE 
  LOWER(TRIM(subcategory)) IN ('football', 'foot', 'soccer')
  OR LOWER(TRIM(discipline)) IN ('football', 'foot', 'soccer')
  OR LOWER(TRIM(nested_sport)) IN ('football', 'foot', 'soccer');

-- STEP 5: Standardize Basketball / Basket -> "Basketball"
UPDATE public.products
SET 
  subcategory = 'Basketball',
  discipline = 'Basketball',
  nested_sport = 'Basketball'
WHERE 
  LOWER(TRIM(subcategory)) IN ('basketball', 'basket', 'nba', 'bball')
  OR LOWER(TRIM(discipline)) IN ('basketball', 'basket', 'nba', 'bball')
  OR LOWER(TRIM(nested_sport)) IN ('basketball', 'basket', 'nba', 'bball');

-- STEP 6: Standardize MMA / UFC -> "MMA"
UPDATE public.products
SET 
  subcategory = 'MMA',
  discipline = 'MMA',
  nested_sport = 'MMA'
WHERE 
  LOWER(TRIM(subcategory)) IN ('mma', 'ufc', 'combats', 'combat')
  OR LOWER(TRIM(discipline)) IN ('mma', 'ufc', 'combats', 'combat')
  OR LOWER(TRIM(nested_sport)) IN ('mma', 'ufc', 'combats', 'combat');

-- STEP 7: Standardize Tennis -> "Tennis"
UPDATE public.products
SET 
  subcategory = 'Tennis',
  discipline = 'Tennis',
  nested_sport = 'Tennis'
WHERE 
  LOWER(TRIM(subcategory)) IN ('tennis')
  OR LOWER(TRIM(discipline)) IN ('tennis')
  OR LOWER(TRIM(nested_sport)) IN ('tennis');

-- STEP 8: Verification Query
SELECT id, title, category, subcategory, discipline, nested_sport, status 
FROM public.products 
WHERE category ILIKE '%sport%' OR subcategory IN ('Boxe', 'Sports Auto', 'Football', 'Basketball', 'MMA', 'Tennis')
ORDER BY created_at DESC;
