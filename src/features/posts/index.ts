import { parser } from '@/libs/remark';
import { getRelativeTimeString } from '@/utils/date';
import { calculateReadingTimeFromAST } from '@/utils/reading-time';
import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import path from 'path';
import z from 'zod';

const POSTS_DIR = path.join(process.cwd(), 'content');

export const frontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  releaseDate: z.string().optional(),
  cover: z.string(),
  draft: z.boolean().optional().default(false),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

export const getAllSlugs = async (): Promise<string[]> => {
  const files = readdirSync(POSTS_DIR);
  return files
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx?$/, ''));
};

export const getPostContent = async (slug: string) => {
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  const markdownContent = readFileSync(filePath, 'utf-8');
  const { content, data } = matter(markdownContent);

  const frontmatter = frontmatterSchema.parse(data);
  const parsed = parser.parse(content);
  return {
    content: parsed,
    frontmatter,
    slug,
    metadata: {
      relativeTime: getRelativeTimeString(frontmatter.date, 'en'),
      readingTime: calculateReadingTimeFromAST(parsed),
    },
  };
};

export const getAllPosts = async () => {
  const slugs = await getAllSlugs();
  const posts = await Promise.all(
    slugs
      .sort((prev, next) => {
        const prevIndex = prev.split('_')[0];
        const nextIndex = next.split('_')[0];
        return prevIndex > nextIndex ? -1 : 1;
      })
      .map((s) => getPostContent(s)),
  );

  return posts;
};
