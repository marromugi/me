import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

export const parser = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml', 'toml'])
  .use(remarkGfm);
