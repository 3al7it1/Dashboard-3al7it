-- Tableaux Décoratifs - Supabase / PostgreSQL Production Clean Slate Seed & Factory Reset Script

-- 1. PURGE ALL OPERATIONAL DATA
TRUNCATE TABLE public.orders RESTART IDENTITY CASCADE;
TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;

-- 2. RESET AD SPEND LOGS TO ZERO
INSERT INTO public.ad_spend (id, facebook, instagram, tiktok, google, cogs_percentage)
VALUES ('current_spend', 0, 0, 0, 0, 35)
ON CONFLICT (id) DO UPDATE SET
  facebook = 0,
  instagram = 0,
  tiktok = 0,
  google = 0,
  cogs_percentage = 35;

-- 3. PRESERVE & SEED STRUCTURAL MASTER CATEGORIES
INSERT INTO public.categories (id, name, name_en, slug, icon, subcategories)
VALUES 
  ('cat-1', 'Cadre', 'Framed Prints', 'cadre', 'Frame', '[
    {"id": "sub-1-1", "name": "Music", "slug": "music"},
    {"id": "sub-1-2", "name": "Films & Séries", "slug": "films-series"},
    {"id": "sub-1-3", "name": "Automobile", "slug": "automobile"},
    {"id": "sub-1-4", "name": "Art & Design", "slug": "art-design"},
    {"id": "sub-1-5", "name": "Motivation", "slug": "motivation"},
    {"id": "sub-1-6", "name": "Sports", "slug": "sports", "nestedSports": ["Football", "Basketball", "MMA", "Boxing", "Motorsport"]}
  ]'::jsonb),
  ('cat-2', 'Panneaux', 'Decorative Panels', 'panneaux', 'Layers', '[
    {"id": "sub-2-1", "name": "Art & Design", "slug": "art-design"},
    {"id": "sub-2-2", "name": "Motivation", "slug": "motivation"},
    {"id": "sub-2-3", "name": "Music", "slug": "music"},
    {"id": "sub-2-4", "name": "Sports", "slug": "sports", "nestedSports": ["Football", "Basketball", "MMA", "Boxing", "Motorsport"]}
  ]'::jsonb),
  ('cat-3', 'Packs', 'Triptych & Bundles', 'packs', 'Grid', '[
    {"id": "sub-3-1", "name": "Pack en 3", "slug": "pack-en-3"},
    {"id": "sub-3-2", "name": "Gallerie Murale", "slug": "gallerie-murale"}
  ]'::jsonb),
  ('cat-4', 'Personnalisé', 'Custom Orders', 'personnalise', 'Sparkles', '[
    {"id": "sub-4-1", "name": "Portrait Personnalisé", "slug": "portrait-personnalise"},
    {"id": "sub-4-2", "name": "Photo sur Mesure", "slug": "photo-sur-mesure"}
  ]'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  slug = EXCLUDED.slug,
  icon = EXCLUDED.icon,
  subcategories = EXCLUDED.subcategories;

-- 4. SEED CMS MASTER CONFIGURATION
INSERT INTO public.cms_config (
  id, hero_mode, video_url, carousel_images, headline, headline_en, subtitle, subtitle_en, cta_text, cta_target_url, badge_text, announcement_text, announcement_active
) VALUES (
  'current_cms',
  'video',
  'https://assets.mixkit.co/videos/preview/mixkit-modern-art-gallery-exhibition-41562-large.mp4',
  '["https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=80", "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80"]'::jsonb,
  'L''Élégance des Tableaux & Panneaux Décoratifs',
  'Elegance in Decorative Panels & Framed Art',
  'Collection exclusive faite à la main en Tunisie. Impression ultra-HD sur châssis bois noble & verre acrylique.',
  'Exclusive handcrafted collection in Tunisia. Ultra-HD print on noble wooden frames & acrylic glass.',
  'Découvrir le Catalog',
  '/catalog',
  'NOUVELLE COLLECTION 2026',
  '✨ Livraison offerte sur toute la Tunisie à partir de 150 DNT d''achat! 🇹🇳',
  true
)
ON CONFLICT (id) DO UPDATE SET
  hero_mode = EXCLUDED.hero_mode,
  video_url = EXCLUDED.video_url,
  carousel_images = EXCLUDED.carousel_images,
  headline = EXCLUDED.headline,
  headline_en = EXCLUDED.headline_en,
  subtitle = EXCLUDED.subtitle,
  subtitle_en = EXCLUDED.subtitle_en,
  cta_text = EXCLUDED.cta_text,
  cta_target_url = EXCLUDED.cta_target_url,
  badge_text = EXCLUDED.badge_text,
  announcement_text = EXCLUDED.announcement_text,
  announcement_active = EXCLUDED.announcement_active;
