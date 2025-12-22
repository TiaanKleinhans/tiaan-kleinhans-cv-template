import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

/**
 * Maps icon name string to LucideIcon component
 * @param iconName - Name of the icon (e.g., 'Code', 'Database', 'Circle')
 * @returns LucideIcon component or a default icon if not found
 */
export function getIconByName(iconName: string): LucideIcon {
  // Convert icon name to match lucide-react export names
  // Handle special cases like 'FileCode' -> 'FileCode', 'GitBranch' -> 'GitBranch'
  const IconComponent = (Icons as Record<string, LucideIcon>)[iconName];
  
  // Return the icon or a default icon if not found
  return IconComponent || Icons.Circle;
}

