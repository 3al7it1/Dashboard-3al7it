-- Tableaux Décoratifs - Supabase PostgreSQL Schema Setup

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  subcategory TEXT,
  nested_sport TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  pixel_dimensions TEXT DEFAULT '1200x1600px',
  pricing_matrix JSONB DEFAULT '{"A4": 45, "A3": 65, "A2": 95, "A1": 145, "A0": 220}'::jsonb,
  status TEXT DEFAULT 'Active',
  base_price NUMERIC DEFAULT 65,
  stock INT DEFAULT 20,
  sales_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  governorate TEXT NOT NULL,
  postal_code TEXT,
  status TEXT DEFAULT 'Pending',
  payment_method TEXT DEFAULT 'Cash on Delivery',
  is_paid BOOLEAN DEFAULT FALSE,
  shipping_fee NUMERIC DEFAULT 7,
  items JSONB DEFAULT '[]'::jsonb,
  total_amount NUMERIC NOT NULL,
  total_panels INT DEFAULT 1,
  custom_asset_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT NOT NULL,
  icon TEXT,
  subcategories JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. AD SPEND & METRICS TABLE
CREATE TABLE IF NOT EXISTS public.ad_spend (
  id TEXT PRIMARY KEY DEFAULT 'current_spend',
  facebook NUMERIC DEFAULT 0,
  instagram NUMERIC DEFAULT 0,
  tiktok NUMERIC DEFAULT 0,
  google NUMERIC DEFAULT 0,
  cogs_percentage NUMERIC DEFAULT 35,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CMS CONFIG TABLE
CREATE TABLE IF NOT EXISTS public.cms_config (
  id TEXT PRIMARY KEY DEFAULT 'current_cms',
  hero_mode TEXT DEFAULT 'video',
  video_url TEXT,
  carousel_images JSONB DEFAULT '[]'::jsonb,
  headline TEXT,
  headline_en TEXT,
  subtitle TEXT,
  subtitle_en TEXT,
  cta_text TEXT,
  cta_target_url TEXT,
  badge_text TEXT,
  announcement_text TEXT,
  announcement_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for public access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_spend ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_config ENABLE ROW LEVEL SECURITY;

-- Create Policies for Anonymous/Public CRUD Access
CREATE POLICY "Public Read Access" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.products FOR ALL USING (true);

CREATE POLICY "Public Read Access" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.orders FOR ALL USING (true);

CREATE POLICY "Public Read Access" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.categories FOR ALL USING (true);

CREATE POLICY "Public Read Access" ON public.ad_spend FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.ad_spend FOR ALL USING (true);

CREATE POLICY "Public Read Access" ON public.cms_config FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.cms_config FOR ALL USING (true);
