-- Additional tables for CreaVibe

-- Create ENUM types
CREATE TYPE public.generation_type AS ENUM ('blog', 'image', 'video', 'code', 'other');
CREATE TYPE public.webbook_visibility AS ENUM ('private', 'public', 'shared');
CREATE TYPE public.project_status AS ENUM ('draft', 'in_progress', 'published', 'archived');

-- Update projects table to use the ENUM
ALTER TABLE projects DROP COLUMN IF EXISTS status;
ALTER TABLE projects ADD COLUMN status project_status DEFAULT 'draft';

-- Create webbooks table
CREATE TABLE webbooks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  cover_image_url TEXT,
  visibility webbook_visibility DEFAULT 'private',
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects ON DELETE CASCADE
);

-- Create chapters table
CREATE TABLE chapters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER NOT NULL,
  webbook_id UUID REFERENCES webbooks ON DELETE CASCADE NOT NULL
);

-- Create generations table
CREATE TABLE generations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type generation_type NOT NULL,
  prompt TEXT NOT NULL,
  result TEXT,
  metadata JSONB,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES projects ON DELETE SET NULL
);

-- Create api_tokens table
CREATE TABLE api_tokens (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  token TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL
);

-- Create feedback table
CREATE TABLE feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  content TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL
);

-- Enable Row Level Security for all tables
ALTER TABLE webbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for webbooks
CREATE POLICY "Webbooks are viewable by owner."
  ON webbooks FOR SELECT USING (auth.uid() = user_id OR visibility = 'public');

CREATE POLICY "Users can insert their own webbooks."
  ON webbooks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own webbooks."
  ON webbooks FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own webbooks."
  ON webbooks FOR DELETE USING (auth.uid() = user_id);

-- Create policies for chapters
CREATE POLICY "Chapters are viewable by webbook owner."
  ON chapters FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM webbooks WHERE id = chapters.webbook_id
    ) OR webbook_id IN (
      SELECT id FROM webbooks WHERE visibility = 'public'
    )
  );

CREATE POLICY "Users can insert chapters to their own webbooks."
  ON chapters FOR INSERT WITH CHECK (
    webbook_id IN (
      SELECT id FROM webbooks WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update chapters in their own webbooks."
  ON chapters FOR UPDATE USING (
    webbook_id IN (
      SELECT id FROM webbooks WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete chapters in their own webbooks."
  ON chapters FOR DELETE USING (
    webbook_id IN (
      SELECT id FROM webbooks WHERE user_id = auth.uid()
    )
  );

-- Create policies for generations
CREATE POLICY "Generations are viewable by owner."
  ON generations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations."
  ON generations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generations."
  ON generations FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generations."
  ON generations FOR DELETE USING (auth.uid() = user_id);

-- Create policies for api_tokens
CREATE POLICY "API tokens are viewable by owner."
  ON api_tokens FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own API tokens."
  ON api_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own API tokens."
  ON api_tokens FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own API tokens."
  ON api_tokens FOR DELETE USING (auth.uid() = user_id);

-- Create policies for feedback
CREATE POLICY "Feedback is viewable by owner."
  ON feedback FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback."
  ON feedback FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own feedback."
  ON feedback FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own feedback."
  ON feedback FOR DELETE USING (auth.uid() = user_id);

-- Create function to generate API token
CREATE OR REPLACE FUNCTION generate_api_token()
RETURNS TEXT AS $$
DECLARE
  token TEXT;
BEGIN
  token := encode(gen_random_bytes(32), 'hex');
  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user storage usage
CREATE OR REPLACE FUNCTION get_user_storage_usage(user_uuid UUID)
RETURNS BIGINT AS $$
DECLARE
  total_size BIGINT;
BEGIN
  SELECT COALESCE(SUM(LENGTH(result)), 0)
  INTO total_size
  FROM generations
  WHERE user_id = user_uuid;
  
  RETURN total_size;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to validate API token
CREATE OR REPLACE FUNCTION validate_api_token(token_value TEXT)
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  SELECT user_id INTO user_id
  FROM api_tokens
  WHERE token = token_value
  AND (expires_at IS NULL OR expires_at > NOW());
  
  IF user_id IS NOT NULL THEN
    UPDATE api_tokens
    SET last_used_at = NOW()
    WHERE token = token_value;
  END IF;
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_projects_timestamp
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_webbooks_timestamp
BEFORE UPDATE ON webbooks
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_chapters_timestamp
BEFORE UPDATE ON chapters
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_generations_timestamp
BEFORE UPDATE ON generations
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_api_tokens_timestamp
BEFORE UPDATE ON api_tokens
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_feedback_timestamp
BEFORE UPDATE ON feedback
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
