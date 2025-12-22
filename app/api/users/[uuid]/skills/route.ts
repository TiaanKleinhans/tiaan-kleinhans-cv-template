import { createAdminClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import type { SkillCategoryWithSkills } from '@/types/database';

/**
 * GET /api/users/[uuid]/skills
 * Fetches all skill categories and their associated skills for a user
 */
export async function GET(request: Request, { params }: { params: Promise<{ uuid: string }> }) {
  try {
    const { uuid } = await params;

    const supabase = createAdminClient();

    // First, fetch all skill categories for the user
    // Test: Let's also try without the filter to see if table exists
    const { data: allCategories, error: testError } = await supabase
      .from('skill_categories')
      .select('*')
      .limit(10);

    const { data: categories, error: categoriesError } = await supabase
      .from('skill_categories')
      .select('*')
      .eq('user_id', uuid)
      .order('created_at', { ascending: true });

    if (categoriesError) {
      console.error('API Route - Supabase error fetching categories:', {
        message: categoriesError.message,
        code: categoriesError.code,
        details: categoriesError.details,
        hint: categoriesError.hint,
      });
      return NextResponse.json(
        {
          error: categoriesError.message,
          code: categoriesError.code,
          details: categoriesError.details,
        },
        { status: 500 }
      );
    }

    if (!categories || categories.length === 0) {
      return NextResponse.json({ skill_categories: [] });
    }

    // Fetch all skills for these categories
    const categoryIds = categories.map((cat) => cat.id);

    const { data: skills, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .in('skill_category_id', categoryIds)
      .order('created_at', { ascending: true });

    if (skillsError) {
      console.error('API Route - Supabase error fetching skills:', {
        message: skillsError.message,
        code: skillsError.code,
        details: skillsError.details,
        hint: skillsError.hint,
      });
      return NextResponse.json(
        {
          error: skillsError.message,
          code: skillsError.code,
          details: skillsError.details,
        },
        { status: 500 }
      );
    }

    // Combine categories with their skills
    const categoriesWithSkills: SkillCategoryWithSkills[] = categories.map((category) => ({
      ...category,
      skills: skills?.filter((skill) => skill.skill_category_id === category.id) || [],
    }));

    return NextResponse.json({ skill_categories: categoriesWithSkills });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
