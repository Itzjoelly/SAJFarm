-- ====================================================================
-- SAJFARM E-COMMERCE DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ====================================================================
-- Copy and paste this script directly into your Supabase Dashboard:
-- SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    state TEXT DEFAULT 'Lagos State',
    area TEXT DEFAULT 'Ikeja',
    address TEXT,
    mandatory_fallback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY, -- e.g. 'SAJ-8942-LG'
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    date TEXT,
    state TEXT NOT NULL,
    area TEXT,
    address TEXT NOT NULL,
    mandatory_fallback TEXT NOT NULL,
    van_accessibility TEXT,
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    delivery_fee NUMERIC NOT NULL DEFAULT 0,
    total_amount NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL,
    payment_status TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'order_confirmed',
    driver_name TEXT,
    driver_phone TEXT,
    van_plate TEXT,
    estimated_arrival TEXT,
    timeline JSONB NOT NULL DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. WAITLIST / PRE-ORDERS TABLE (COMING SOON PRODUCTS)
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
-- Enable RLS on all tables
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access for the e-commerce client app (Anon Key)
CREATE POLICY "Allow public read access on orders" 
ON public.orders FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert on orders" 
ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public update on orders" 
ON public.orders FOR UPDATE TO anon, authenticated USING (true);

CREATE POLICY "Allow public read and write on customers" 
ON public.customers FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public insert on waitlist" 
ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public select on waitlist" 
ON public.waitlist FOR SELECT TO anon, authenticated USING (true);

-- ====================================================================
-- SEED INITIAL DATA (OPTIONAL DEMO BROILER ORDERS)
-- ====================================================================
INSERT INTO public.orders (
    id, customer_name, phone, email, date, state, area, address, 
    mandatory_fallback, van_accessibility, items, delivery_fee, total_amount, 
    payment_method, payment_status, status, driver_name, driver_phone, van_plate, 
    estimated_arrival, timeline
) VALUES (
    'SAJ-8942-LG',
    'Chief Adebayo Ogunlesi',
    '0803 456 7890',
    'adebayo.ogunlesi@gmail.com',
    'Today, 10:15 AM',
    'Lagos State',
    'Lekki Phase 1',
    'Plot 14 Admiralty Way, Lekki Phase 1, Lagos',
    'Ebeano Supermarket Junction / Lekki Phase 1 Roundabout',
    'Wide residential street, van can park in front of the gate',
    '[{"product":"Fresh Farm Broiler - Medium Premium Broiler (2.1kg – 2.4kg)","quantity":3,"preparation":"Kill, Defeather & Cut into Pieces","pieces":"8 Standard Pieces","gizzard":true,"pricePerBird":8600,"subtotal":25800}]'::JSONB,
    2500,
    28300,
    'paystack',
    'Paid via Paystack (Ref: PSTK-90241-CONF)',
    'out_for_delivery',
    'Musa Ibrahim',
    '0803 725 3276',
    'LG-VAN-412',
    'Today, 1:30 PM (Within 25 mins)',
    '[
        {"step":1,"title":"Order Confirmed & Payment Verified","time":"10:15 AM","completed":true,"desc":"Payment confirmed via Paystack. Dispatched to SAJFarm farmstead pen #4."},
        {"step":2,"title":"Healthy Broiler Selection & Weighing","time":"10:35 AM","completed":true,"desc":"3 mature broilers selected and certified healthy. Verified weights: 2.25kg, 2.30kg, 2.38kg."},
        {"step":3,"title":"Hygienic Halal Slaughter & Dressing","time":"11:15 AM","completed":true,"desc":"Birds processed according to Halal standards, defeathered with warm-water mechanical spin, washed, gizzards degreased spotless, and cut into 8 stew-ready portions."},
        {"step":4,"title":"Chilled Packaging & Loading","time":"11:55 AM","completed":true,"desc":"Placed in food-grade sealed pouches, packed in thermal insulated dry-ice box inside refrigerated Van LG-VAN-412."},
        {"step":5,"title":"Out for Delivery (Lekki / Landmark Fallback)","time":"12:20 PM","completed":true,"current":true,"desc":"Van en route along Lekki-Epe expressway. Driver instructed to proceed to Plot 14 Admiralty Way or Ebeano Supermarket Junction if street is closed."},
        {"step":6,"title":"Doorstep / Fallback Handover Complete","time":"Pending","completed":false,"desc":"Order delivered fresh, chilled, and certified."}
    ]'::JSONB
) ON CONFLICT (id) DO NOTHING;
