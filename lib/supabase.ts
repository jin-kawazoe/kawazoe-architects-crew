import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Partner = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  area?: string;
  business_type?: string;
  skills: string[];
  softwares: string[];
  qualifications?: string;
  coverage_areas: string[];
  rate_range?: string;
  availability?: string;
  portfolio_url?: string;
  note?: string;
  created_at?: string;
};

export type Recruit = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  age?: number;
  education?: string;
  employment_status?: string;
  position?: string;
  experience_years?: string;
  qualifications?: string;
  work_history?: string;
  softwares: string[];
  preferred_location?: string;
  available_from?: string;
  motivation: string;
  portfolio_url?: string;
  resume_url?: string;
  created_at?: string;
};
