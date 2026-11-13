-- ==============================================================================
-- AMMU FOODS - PRODUCTION RELATIONAL DATABASE SCHEMA
-- Brand: AMMu – Leading Dried Fruits (100% Pure Grade-1 Kashmiri Saffron / Kesar)
-- Database Engine: PostgreSQL 13+ (ANSI SQL-Compliant, MySQL-Compatible Types Noted)
-- ==============================================================================

-- 1. EXTENSIONS & PREREQUISITES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. BRAND & BUSINESS SETTINGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS brand_settings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL DEFAULT 'Ammu Foods',
    brand_title VARCHAR(255) NOT NULL DEFAULT 'Ammu - Leading Dried Fruits',
    tagline VARCHAR(255) NOT NULL DEFAULT '100% Pure Kashmiri Saffron (Kesar)',
    logo_url TEXT,
    manufacturer VARCHAR(255) NOT NULL DEFAULT 'Infinity Food Consumer',
    address TEXT NOT NULL DEFAULT 'JDA Market Veerangana Nagar Medical Jhansi - 284128, Uttar Pradesh, India',
    fssai_license VARCHAR(50) NOT NULL DEFAULT '22720559000206',
    email VARCHAR(150) NOT NULL DEFAULT 'ketansinghniranjan24@gmail.com',
    secondary_email VARCHAR(150) DEFAULT 'ammuonline21@gmail.com',
    phone VARCHAR(50) NOT NULL DEFAULT '+91 7303817365',
    raw_phone VARCHAR(20) NOT NULL DEFAULT '7303817365',
    whatsapp_number VARCHAR(30) NOT NULL DEFAULT '917303817365',
    help_desk VARCHAR(50) NOT NULL DEFAULT '+91-8090060273',
    default_currency VARCHAR(10) NOT NULL DEFAULT '₹',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 3. HERO & SHOWCASE SECTION
-- ==============================================================================
CREATE TABLE IF NOT EXISTS hero_config (
    id SERIAL PRIMARY KEY,
    badge VARCHAR(255) NOT NULL DEFAULT '100% Pure Saffron • FSSAI Lic. 22720559000206',
    title VARCHAR(255) NOT NULL DEFAULT 'Pure Kashmiri Kesar',
    title_highlight VARCHAR(255) NOT NULL DEFAULT 'Grade A++ Saffron Threads',
    description TEXT NOT NULL,
    deal_badge VARCHAR(100) DEFAULT 'Top Rated On Meesho',
    deal_title VARCHAR(255) DEFAULT 'AMMu Gold Kashmiri Kesar (1g)',
    deal_subtitle VARCHAR(255) DEFAULT 'A++ Grade Saffron • Sealed Heritage Gold Tin Box',
    deal_price NUMERIC(10, 2) NOT NULL DEFAULT 378.00,
    deal_original_price NUMERIC(10, 2) NOT NULL DEFAULT 599.00,
    deal_discount VARCHAR(50) DEFAULT '37% OFF Deal',
    hero_image_url TEXT NOT NULL DEFAULT '/images/ammu-gold-tin.webp',
    meesho_link TEXT,
    amazon_link TEXT,
    flipkart_link TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hero_key_points (
    id SERIAL PRIMARY KEY,
    hero_id INT NOT NULL REFERENCES hero_config(id) ON DELETE CASCADE,
    point_text VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0
);

-- ==============================================================================
-- 4. PRODUCT CATEGORIES & FILTER TAXONOMY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_categories (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'ammu-gold', 'ammu-pure', 'kashmir-ki-rani', 'multipack'
    slug VARCHAR(50) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 5. PRODUCTS MASTER CATALOG
-- ==============================================================================
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'ammu-gold-tin-1g'
    name VARCHAR(255) NOT NULL,
    common_name VARCHAR(150), -- Series name e.g. 'AMMu Gold', 'Kashmir Ki Rani'
    category_id VARCHAR(50) REFERENCES product_categories(id) ON DELETE SET NULL,
    weight VARCHAR(50) NOT NULL DEFAULT '1 Gram',
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    original_price NUMERIC(10, 2) NOT NULL CHECK (original_price >= 0),
    badge VARCHAR(100), -- 'Best Seller', 'Royal Edition', 'Value Pack'
    description TEXT NOT NULL,
    popular BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    stock_status VARCHAR(30) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'low_stock', 'out_of_stock')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for fast search and catalog filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active_order ON products(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_products_popular ON products(popular) WHERE popular = TRUE;

-- ==============================================================================
-- 6. MULTIPLE PRODUCT IMAGES & GALLERY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_images (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id, display_order);

-- ==============================================================================
-- 7. PRODUCT BULLET FEATURES & HIGHLIGHTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_features (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    feature_text VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_product_features_product ON product_features(product_id, display_order);

-- ==============================================================================
-- 8. PRODUCT MARKETPLACE LINKS (Meesho, Amazon, Flipkart, etc.)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS product_marketplace_links (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('meesho', 'amazon', 'flipkart', 'jiomart', 'other')),
    url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (product_id, platform)
);

-- ==============================================================================
-- 9. DIRECT CUSTOMER DESK - INQUIRIES & LEADS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS customer_inquiries (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'inq_1794546881050_0vn3hu'
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150),
    inquiry_topic VARCHAR(150) NOT NULL, -- 'Product Purity & Authentication', 'Pregnancy & Daily Wellness Recommendation', etc.
    detailed_explanation TEXT, -- Optional detailed question/requirements from customer
    product_reference VARCHAR(255),
    quantity VARCHAR(50) DEFAULT 'N/A',
    status VARCHAR(30) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'spam', 'archived')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON customer_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON customer_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON customer_inquiries(phone);

-- ==============================================================================
-- 10. CUSTOMER REVIEWS & FEEDBACK
-- ==============================================================================
CREATE TABLE IF NOT EXISTS customer_reviews (
    id VARCHAR(100) PRIMARY KEY, -- e.g. 'rev-1', 'rev-2'
    name VARCHAR(150) NOT NULL,
    location VARCHAR(150) NOT NULL, -- e.g. 'Mumbai, Maharashtra'
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    product_id VARCHAR(100) REFERENCES products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE, -- To pin to landing page (3 to 6 reviews)
    is_active BOOLEAN DEFAULT TRUE,
    helpful_count INT DEFAULT 0,
    review_date VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reviews_rating ON customer_reviews(rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_active_featured ON customer_reviews(is_active, is_featured);

-- ==============================================================================
-- 11. TRUST & QUALITY BADGES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS trust_badges (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(255) NOT NULL,
    icon_name VARCHAR(50),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- ==============================================================================
-- 12. FREQUENTLY ASKED QUESTIONS (FAQs)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS faqs (
    id VARCHAR(100) PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'General',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 13. PURITY TESTING HOME GUIDE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS purity_tests (
    id VARCHAR(100) PRIMARY KEY,
    test_name VARCHAR(150) NOT NULL,
    summary TEXT NOT NULL,
    procedure_steps TEXT NOT NULL,
    pure_saffron_result TEXT NOT NULL,
    fake_saffron_result TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- ==============================================================================
-- 14. NUTRITION FACTS & STANDARDS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS nutrition_facts (
    id SERIAL PRIMARY KEY,
    nutrient_name VARCHAR(100) NOT NULL,
    amount_per_100g VARCHAR(50) NOT NULL,
    daily_value_percent VARCHAR(30),
    display_order INT DEFAULT 0
);

-- ==============================================================================
-- 15. ADMIN USERS & AUDIT LOGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id VARCHAR(100) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    role VARCHAR(50) NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'manager', 'sales_desk')),
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES admin_users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL, -- e.g. 'PRODUCT_UPDATE', 'INQUIRY_STATUS_CHANGE', 'LOGO_UPDATE'
    entity_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_name, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ==============================================================================
-- 16. MEDIA & UPLOADS ASSETS REGISTRY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS media_assets (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    mime_type VARCHAR(100),
    file_size_bytes BIGINT,
    entity_type VARCHAR(50), -- 'logo', 'product', 'hero', 'review'
    entity_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- 17. AUTOMATIC TIMESTAMP TRIGGER
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_brand_settings_updated ON brand_settings;
CREATE TRIGGER trg_brand_settings_updated
BEFORE UPDATE ON brand_settings
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_products_updated ON products;
CREATE TRIGGER trg_products_updated
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_customer_inquiries_updated ON customer_inquiries;
CREATE TRIGGER trg_customer_inquiries_updated
BEFORE UPDATE ON customer_inquiries
FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- ==============================================================================
-- 18. USEFUL REPORTING & DASHBOARD VIEWS
-- ==============================================================================

-- Complete Product View with Primary Image and Marketplace URLs
CREATE OR REPLACE VIEW v_catalog_products AS
SELECT
    p.id,
    p.name,
    p.common_name,
    p.weight,
    p.price,
    p.original_price,
    ROUND(((p.original_price - p.price) / p.original_price) * 100) AS discount_percent,
    p.badge,
    p.popular,
    p.category_id,
    c.label AS category_label,
    p.description,
    p.stock_status,
    COALESCE(
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1),
        (SELECT image_url FROM product_images WHERE product_id = p.id ORDER BY display_order ASC LIMIT 1),
        '/images/ammu-gold-tin.webp'
    ) AS primary_image_url,
    (SELECT COUNT(*) FROM product_images WHERE product_id = p.id) AS total_images_count,
    (SELECT url FROM product_marketplace_links WHERE product_id = p.id AND platform = 'meesho' LIMIT 1) AS meesho_url,
    (SELECT url FROM product_marketplace_links WHERE product_id = p.id AND platform = 'amazon' LIMIT 1) AS amazon_url,
    (SELECT url FROM product_marketplace_links WHERE product_id = p.id AND platform = 'flipkart' LIMIT 1) AS flipkart_url
FROM products p
LEFT JOIN product_categories c ON p.category_id = c.id
WHERE p.is_active = TRUE
ORDER BY p.popular DESC, p.display_order ASC;

-- Sales Desk Active Inquiries View
CREATE OR REPLACE VIEW v_active_customer_leads AS
SELECT
    id,
    name,
    phone,
    email,
    inquiry_topic,
    detailed_explanation,
    status,
    created_at,
    AGE(CURRENT_TIMESTAMP, created_at) AS time_elapsed
FROM customer_inquiries
ORDER BY created_at DESC;

-- ==============================================================================
-- 19. SEED DATA (AMMU FOODS INITIAL DATASET)
-- ==============================================================================

-- Brand Settings Seed
INSERT INTO brand_settings (id, name, brand_title, tagline, logo_url, manufacturer, address, fssai_license, email, phone, raw_phone, whatsapp_number, help_desk)
VALUES (
    1,
    'Ammu Foods',
    'Ammu - Leading Dried Fruits',
    '100% Pure Kashmiri Saffron (Kesar)',
    NULL,
    'Infinity Food Consumer',
    'JDA Market Veerangana Nagar Medical Jhansi - 284128, Uttar Pradesh, India',
    '22720559000206',
    'ketansinghniranjan24@gmail.com',
    '+91 7303817365',
    '7303817365',
    '917303817365',
    '+91-8090060273'
) ON CONFLICT (id) DO NOTHING;

-- Product Categories
INSERT INTO product_categories (id, slug, label, display_order) VALUES
('ammu-gold', 'ammu-gold', 'AMMu Gold', 1),
('kashmir-ki-rani', 'kashmir-ki-rani', 'Kashmir Ki Rani', 2),
('ammu-pure', 'ammu-pure', 'AMMu Pure Pot', 3),
('multipack', 'multipack', 'Multi-Packs (2g–5g)', 4)
ON CONFLICT (id) DO NOTHING;

-- Flagship Products Seed
INSERT INTO products (id, name, common_name, category_id, weight, price, original_price, badge, popular, description, display_order) VALUES
('ammu-gold-tin-1g', 'AMMu Gold Kashmiri Kesar (1g Tin)', 'AMMu Gold', 'ammu-gold', '1 Gram', 378.00, 599.00, 'Best Seller', TRUE, 'Our flagship 100% pure Grade A++ Kashmiri Mongra saffron packed in an airtight gold metal tin. Maximum color potency (crocin > 240) and rich aroma.', 1),
('ammu-acrylic-pot-1g', 'AMMu Pure Kashmiri Saffron (1g Pot)', 'AMMu Pure Pot', 'ammu-pure', '1 Gram', 347.00, 499.00, 'Daily Wellness', FALSE, 'Compact crystal acrylic jewel pot with airtight golden rim. Perfect for daily milk, skin glow, and Ayurvedic health routines.', 2),
('ammu-kashmir-ki-rani-1g', 'AMMu Kashmir Ki Rani (1g Hex Jar)', 'Kashmir Ki Rani', 'kashmir-ki-rani', '1 Gram', 365.00, 525.00, 'Royal Edition', FALSE, 'Hand-selected long crimson threads in a traditional hexagonal glass flacon with golden lid. Known as Kashmir ki Rani for unmatched flavor.', 3),
('ammu-twin-pack-2g', 'AMMu Gold Twin Pack (2 x 1g Tins)', 'AMMu Gold', 'multipack', '2 Grams (2x1g)', 699.00, 1198.00, 'Value Pack', TRUE, 'Two individually sealed 1g golden tins. Perfect for households using saffron for pregnancy wellness and weekly festive cooking.', 4)
ON CONFLICT (id) DO NOTHING;

-- Multiple Images for Products
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
('ammu-gold-tin-1g', '/images/ammu-gold-tin.webp', 'AMMu Gold Kashmiri Kesar 1g Tin Front View', TRUE, 1),
('ammu-gold-tin-1g', '/images/ammu-1g.svg', 'AMMu Gold 1g Packaging Vector Spec', FALSE, 2),
('ammu-gold-tin-1g', '/images/ammu-nutrition-facts.webp', 'AMMu Saffron Lab & Nutrition Breakdown', FALSE, 3),
('ammu-acrylic-pot-1g', '/images/ammu-round-acrylic-jar.webp', 'AMMu Pure Acrylic Jewel Pot 1g', TRUE, 1),
('ammu-acrylic-pot-1g', '/images/ammu-1g.svg', 'AMMu Acrylic Pot 1g Vector Spec', FALSE, 2),
('ammu-kashmir-ki-rani-1g', '/images/ammu-kashmir-ki-rani-jar.webp', 'AMMu Kashmir Ki Rani 1g Hexagonal Flacon', TRUE, 1),
('ammu-kashmir-ki-rani-1g', '/images/ammu-1g.svg', 'AMMu Kashmir Ki Rani 1g Spec', FALSE, 2)
ON CONFLICT DO NOTHING;

-- Marketplace Links Seed
INSERT INTO product_marketplace_links (product_id, platform, url) VALUES
('ammu-gold-tin-1g', 'meesho', 'https://www.meesho.com/search?q=AMMu+Gold+Kashmiri+Kesar+Saffron'),
('ammu-gold-tin-1g', 'amazon', 'https://www.amazon.in/s?k=AMMu+Gold+Kashmiri+Kesar+Saffron'),
('ammu-gold-tin-1g', 'flipkart', 'https://www.flipkart.com/search?q=AMMu+Gold+Kashmiri+Kesar+Saffron'),
('ammu-acrylic-pot-1g', 'meesho', 'https://www.meesho.com/search?q=AMMu+Pure+Saffron+1g'),
('ammu-acrylic-pot-1g', 'amazon', 'https://www.amazon.in/s?k=AMMu+Pure+Saffron+1g'),
('ammu-acrylic-pot-1g', 'flipkart', 'https://www.flipkart.com/search?q=AMMu+Pure+Saffron+1g')
ON CONFLICT DO NOTHING;

-- Product Features Seed
INSERT INTO product_features (product_id, feature_text, display_order) VALUES
('ammu-gold-tin-1g', 'Airtight golden freshness tin', 1),
('ammu-gold-tin-1g', 'Grade A++ Kashmiri Mongra (All-red stigmas)', 2),
('ammu-gold-tin-1g', 'Certified FSSAI Lic. 22720559000206', 3),
('ammu-gold-tin-1g', 'Single origin harvest from Kashmir Valley', 4);

