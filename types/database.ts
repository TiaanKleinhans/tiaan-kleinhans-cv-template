/**
 * Database Types for Skill Categories and Skills
 * These types match the Supabase database schema
 */

export interface SkillCategory {
  id: string; // UUID
  user_id: string; // UUID - Foreign key to users table
  title: string;
  translation_key: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface Skill {
  id: string; // UUID
  skill_category_id: string; // UUID - Foreign key to skill_categories table
  skill_name: string;
  skill_translation_key: string;
  skill_icon: string; // Icon name from lucide-react (e.g., 'Circle', 'Package', 'Database', 'Layout')
  more_info: string | null; // Optional field
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Extended types with relationships
 */
export interface SkillCategoryWithSkills extends SkillCategory {
  skills: Skill[];
}

export interface UserWithSkillCategories {
  id: string;
  name: string;
  surname: string;
  skill_categories: SkillCategoryWithSkills[];
}

/**
 * Icon names that can be used in skill_icon field
 * These correspond to lucide-react icon names
 */
export type SkillIconName =
  | 'Circle'
  | 'Package'
  | 'Database'
  | 'Layout'
  | 'Code'
  | 'Cloud'
  | 'Server'
  | 'Layers'
  | 'Box'
  | 'FileCode'
  | 'Globe'
  | 'Zap'
  | 'Calendar'
  | 'Shield'
  | 'Key'
  | 'Network'
  | 'Monitor'
  | 'Split'
  | 'Github'
  | 'GitBranch'
  | 'Briefcase'
  | 'Trophy'
  | 'Award'
  | 'TrendingUp'
  | 'GitMerge'
  | 'Rocket'
  | 'CheckCircle'
  | string; // Allow any string for flexibility

/**
 * Accomplishment types for timeline display
 */
export interface Accomplishment {
  id: string; // UUID
  user_id: string; // UUID - Foreign key to users table
  name: string;
  translation_key: string;
  accomplishment_date: string; // ISO date string (YYYY-MM-DD)
  icon: string | null; // Icon name from lucide-react (optional)
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Analytics types for visitor tracking
 */
export interface Visitor {
  id: string; // UUID
  user_id: string; // UUID - Foreign key to users table
  session_id: string; // Unique identifier for this page load
  ip_address: string | null;
  user_agent: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface SectionView {
  id: string; // UUID
  visitor_id: string; // UUID - Foreign key to visitors table
  section_name: 'hero' | 'cv' | 'skills' | 'mountain';
  viewed_at: string; // ISO timestamp
}

export interface AnalyticsStats {
  total_visitors: number;
  sections: {
    hero: number;
    cv: number;
    skills: number;
    mountain: number;
  };
  percentages: {
    hero: number;
    cv: number;
    skills: number;
    mountain: number;
  };
}

