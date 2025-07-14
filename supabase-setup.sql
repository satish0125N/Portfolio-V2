-- Supabase Database Setup for Portfolio
-- Run these SQL commands in your Supabase SQL Editor

-- Enable Row Level Security (RLS) for all tables
-- This is important for security

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    technologies TEXT[], -- Array of technology strings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Create contacts table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Create site_views table
CREATE TABLE IF NOT EXISTS public.site_views (
    id INTEGER PRIMARY KEY DEFAULT 1,
    count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    CONSTRAINT single_row CHECK (id = 1)
);

-- 4. Insert initial site_views record
INSERT INTO public.site_views (id, count) VALUES (1, 0) ON CONFLICT (id) DO NOTHING;

-- 5. Create function to increment site views
CREATE OR REPLACE FUNCTION increment_site_views()
RETURNS void AS $$
BEGIN
    UPDATE public.site_views 
    SET count = count + 1, updated_at = NOW() 
    WHERE id = 1;
END;
$$ LANGUAGE plpgsql;

-- 6. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create triggers for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_views_updated_at
    BEFORE UPDATE ON public.site_views
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Enable Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_views ENABLE ROW LEVEL SECURITY;

-- 9. Create RLS policies

-- Projects policies (public read, authenticated write)
CREATE POLICY "Public can read projects" ON public.projects
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON public.projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON public.projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON public.projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Contacts policies (public can insert, authenticated can read)
CREATE POLICY "Public can insert contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read contacts" ON public.contacts
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contacts" ON public.contacts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Site views policies (public can read and execute function)
CREATE POLICY "Public can read site views" ON public.site_views
    FOR SELECT USING (true);

CREATE POLICY "Public can update site views" ON public.site_views
    FOR UPDATE USING (true);

-- 10. Insert sample data (optional)
INSERT INTO public.projects (title, description, image_url, demo_url, github_url, technologies) VALUES
(
    'E-Commerce Platform',
    'A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, product catalog, shopping cart, and payment integration.',
    'https://via.placeholder.com/600x400/3b82f6/ffffff?text=E-Commerce+Platform',
    'https://example.com',
    'https://github.com/satish/ecommerce',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe']
),
(
    'Task Management App',
    'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    'https://via.placeholder.com/600x400/10b981/ffffff?text=Task+Manager',
    'https://example.com',
    'https://github.com/satish/taskmanager',
    ARRAY['React', 'Firebase', 'Tailwind CSS', 'Socket.io']
),
(
    'Weather Dashboard',
    'A responsive weather dashboard that displays current weather conditions, forecasts, and historical data with beautiful visualizations.',
    'https://via.placeholder.com/600x400/f59e0b/ffffff?text=Weather+Dashboard',
    'https://example.com',
    'https://github.com/satish/weather-dashboard',
    ARRAY['React', 'Chart.js', 'OpenWeatherMap API', 'Tailwind CSS']
);

-- Success message
SELECT 'Database setup completed successfully!' as message;
