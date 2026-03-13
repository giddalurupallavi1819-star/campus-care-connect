
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('student', 'faculty', 'counselor', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  department TEXT,
  student_id TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles viewable by authenticated" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  course TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students view own attendance" ON public.attendance FOR SELECT USING (auth.uid() = student_id OR public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Faculty can insert attendance" ON public.attendance FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

-- Academic records
CREATE TABLE public.academic_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course TEXT NOT NULL,
  gpa NUMERIC(3,2),
  assignment_rate NUMERIC(5,2),
  exam_score NUMERIC(5,2),
  semester TEXT NOT NULL,
  backlogs INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.academic_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View academic records" ON public.academic_records FOR SELECT USING (auth.uid() = student_id OR public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Faculty can manage records" ON public.academic_records FOR ALL USING (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'admin'));

-- Mood surveys
CREATE TABLE public.mood_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood_score INTEGER NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
  stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
  sleep_hours NUMERIC(3,1),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.mood_surveys ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own surveys" ON public.mood_surveys FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Staff view surveys" ON public.mood_surveys FOR SELECT USING (public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));

-- Activities
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_type TEXT NOT NULL,
  activity_name TEXT NOT NULL,
  participation_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View activities" ON public.activities FOR SELECT USING (auth.uid() = student_id OR public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students manage activities" ON public.activities FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Risk scores
CREATE TABLE public.risk_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score INTEGER NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
  dropout_risk INTEGER CHECK (dropout_risk BETWEEN 0 AND 100),
  burnout_risk INTEGER CHECK (burnout_risk BETWEEN 0 AND 100),
  stress_risk INTEGER CHECK (stress_risk BETWEEN 0 AND 100),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
  reasons JSONB DEFAULT '[]',
  suggested_actions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.risk_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View risk scores" ON public.risk_scores FOR SELECT USING (auth.uid() = student_id OR public.has_role(auth.uid(), 'faculty') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "System can insert scores" ON public.risk_scores FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'faculty'));

-- Counseling sessions
CREATE TABLE public.counseling_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  counselor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.counseling_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View sessions" ON public.counseling_sessions FOR SELECT USING (auth.uid() = student_id OR auth.uid() = counselor_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Create sessions" ON public.counseling_sessions FOR INSERT WITH CHECK (auth.uid() = student_id OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Update sessions" ON public.counseling_sessions FOR UPDATE USING (auth.uid() = counselor_id OR public.has_role(auth.uid(), 'admin'));

-- Alerts
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('risk_threshold', 'attendance_drop', 'mood_decline', 'academic_decline')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "View alerts" ON public.alerts FOR SELECT USING (auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'counselor') OR public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Create alerts" ON public.alerts FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'faculty'));
CREATE POLICY "Update alerts" ON public.alerts FOR UPDATE USING (auth.uid() = assigned_to OR public.has_role(auth.uid(), 'admin'));

-- Chat logs for AI chatbot
CREATE TABLE public.chat_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
  sentiment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own chats" ON public.chat_logs FOR ALL USING (auth.uid() = user_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_counseling_sessions_updated_at BEFORE UPDATE ON public.counseling_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student'));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
