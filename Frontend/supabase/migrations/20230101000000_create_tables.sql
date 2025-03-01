-- Enable PostGIS for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create mastomys_observations table
CREATE TABLE public.mastomys_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    location GEOGRAPHY(POINT),
    timestamp TIMESTAMPTZ NOT NULL,
    image_url TEXT,
    user_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create system_metrics table
CREATE TABLE public.system_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL,
    cpu_usage FLOAT,
    ram_usage FLOAT,
    network_in FLOAT,
    network_out FLOAT
);

-- Create ai_logs table
CREATE TABLE public.ai_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id),
    prompt TEXT NOT NULL,
    response TEXT NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    processing_time FLOAT
);

-- Add indexes
CREATE INDEX idx_mastomys_observations_timestamp ON public.mastomys_observations(timestamp);
CREATE INDEX idx_mastomys_observations_location ON public.mastomys_observations USING GIST(location);
CREATE INDEX idx_system_metrics_timestamp ON public.system_metrics(timestamp);
CREATE INDEX idx_ai_logs_timestamp ON public.ai_logs(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE public.mastomys_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own observations"
    ON public.mastomys_observations
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own observations"
    ON public.mastomys_observations
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own AI logs"
    ON public.ai_logs
    FOR SELECT
    USING (auth.uid() = user_id);

