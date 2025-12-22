import {
  Github,
  GitBranch,
  Cloud,
  Code,
  Database,
  Server,
  Layers,
  Box,
  FileCode,
  Globe,
  Zap,
  Calendar,
  Shield,
  Key,
  Network,
  Package,
  Monitor,
  Circle,
  Layout,
  Split,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export type SkillCategory =
  | 'programmingLanguages'
  | 'frameworksLibraries'
  | 'sourceControl'
  | 'cloudDevOps'
  | 'toolsPlatforms'
  | 'architecturePractices';

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: SkillCategory;
  moreInfo?: string;
  translationKey: string;
}

export const SkillsData: Skill[] = [
  // Programming Languages
  {
    name: 'TypeScript',
    icon: Code,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.TYPESCRIPT',
  },
  {
    name: 'JavaScript',
    icon: Code,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.JAVASCRIPT',
  },
  {
    name: 'C#',
    icon: Code,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.CSHARP',
  },
  {
    name: 'HTML',
    icon: FileCode,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.HTML',
  },
  {
    name: 'CSS / SCSS',
    icon: FileCode,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.CSS_SCSS',
  },
  {
    name: 'SQL',
    icon: Database,
    category: 'programmingLanguages',
    translationKey: 'SKILLS.SQL',
  },
  // Frameworks & Libraries
  {
    name: 'Angular',
    icon: Globe,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.ANGULAR',
  },
  {
    name: '.NET / ASP.NET Core',
    icon: Server,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.NET_ASPNET',
  },
  {
    name: 'RxJS',
    icon: Zap,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.RXJS',
  },
  {
    name: 'FullCalendar',
    icon: Calendar,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.FULLCALENDAR',
  },
  {
    name: 'Azure AD B2C',
    icon: Shield,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.AZURE_AD_B2C',
  },
  {
    name: 'Angular Signals',
    icon: Zap,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.ANGULAR_SIGNALS',
  },
  {
    name: 'Next.js',
    icon: Box,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.NEXTJS',
  },
  {
    name: 'Tailwind CSS',
    icon: Layers,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.TAILWIND',
  },
  {
    name: 'Supabase',
    icon: Database,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.SUPABASE',
  },
  {
    name: 'Firebase',
    icon: Database,
    category: 'frameworksLibraries',
    translationKey: 'SKILLS.FIREBASE',
  },
  // Source Control
  {
    name: 'Git',
    icon: GitBranch,
    category: 'sourceControl',
    translationKey: 'SKILLS.GIT',
  },
  {
    name: 'GitHub',
    icon: Github,
    category: 'sourceControl',
    translationKey: 'SKILLS.GITHUB',
  },
  {
    name: 'Azure DevOps',
    icon: Cloud,
    category: 'sourceControl',
    translationKey: 'SKILLS.AZURE_DEVOPS',
  },
  // Cloud & DevOps
  {
    name: 'Microsoft Azure',
    icon: Cloud,
    category: 'cloudDevOps',
    translationKey: 'SKILLS.AZURE',
  },
  {
    name: 'Azure App Services',
    icon: Cloud,
    category: 'cloudDevOps',
    translationKey: 'SKILLS.AZURE_APP_SERVICES',
  },
  {
    name: 'Vercel',
    icon: Zap,
    category: 'cloudDevOps',
    translationKey: 'SKILLS.VERCEL',
  },
  // Tools & Platforms
  {
    name: 'Node.js',
    icon: Circle,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.NODEJS',
  },
  {
    name: 'npm',
    icon: Package,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.NPM',
  },
  {
    name: 'Visual Studio Code',
    icon: Code,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.VSCODE',
  },
  {
    name: 'Visual Studio',
    icon: Monitor,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.VISUAL_STUDIO',
  },
  {
    name: 'REST APIs',
    icon: Server,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.REST_APIS',
  },
  {
    name: 'JWT / OAuth',
    icon: Key,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.JWT_OAUTH',
  },
  {
    name: 'SQL Databases',
    icon: Database,
    category: 'toolsPlatforms',
    translationKey: 'SKILLS.SQL_DATABASES',
  },
  // Architecture & Practices
  {
    name: 'Full-Stack Development',
    icon: Layers,
    category: 'architecturePractices',
    translationKey: 'SKILLS.FULL_STACK',
  },
  {
    name: 'Component-Based Architecture',
    icon: Layout,
    category: 'architecturePractices',
    translationKey: 'SKILLS.COMPONENT_ARCHITECTURE',
  },
  {
    name: 'Reusable Component Design',
    icon: Package,
    category: 'architecturePractices',
    translationKey: 'SKILLS.REUSABLE_COMPONENTS',
  },
  {
    name: 'Frontend-Backend Separation',
    icon: Split,
    category: 'architecturePractices',
    translationKey: 'SKILLS.FRONTEND_BACKEND_SEP',
  },
  {
    name: 'RESTful API Design',
    icon: Network,
    category: 'architecturePractices',
    translationKey: 'SKILLS.RESTFUL_API_DESIGN',
  },
  {
    name: 'Authentication & Authorization',
    icon: Shield,
    category: 'architecturePractices',
    translationKey: 'SKILLS.AUTH_FLOWS',
  },
];

export const SkillsByCategory: Record<SkillCategory, Skill[]> = {
  programmingLanguages: SkillsData.filter((skill) => skill.category === 'programmingLanguages'),
  frameworksLibraries: SkillsData.filter((skill) => skill.category === 'frameworksLibraries'),
  sourceControl: SkillsData.filter((skill) => skill.category === 'sourceControl'),
  cloudDevOps: SkillsData.filter((skill) => skill.category === 'cloudDevOps'),
  toolsPlatforms: SkillsData.filter((skill) => skill.category === 'toolsPlatforms'),
  architecturePractices: SkillsData.filter((skill) => skill.category === 'architecturePractices'),
};
