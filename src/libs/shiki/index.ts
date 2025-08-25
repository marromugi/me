import { createHighlighter, type Highlighter } from 'shiki';

export async function getHighlighter(): Promise<Highlighter> {
  return await createHighlighter({
    themes: ['github-dark', 'github-light'],
    langs: [
      'javascript',
      'typescript',
      'jsx',
      'tsx',
      'css',
      'html',
      'json',
      'markdown',
      'bash',
      'python',
      'rust',
      'go',
      'java',
      'cpp',
      'c',
      'yaml',
      'sql',
      'graphql',
      'diff',
      'shell',
      'plaintext',
    ],
  });
}

const highlighter = await getHighlighter();

export async function highlightCode(
  code: string,
  lang: string = 'plaintext',
  theme: 'github-dark' | 'github-light' = 'github-dark',
): Promise<string> {
  // Check if the language is supported, fallback to plaintext if not
  const supportedLangs = highlighter.getLoadedLanguages();
  const language = supportedLangs.includes(lang) ? lang : 'plaintext';

  return highlighter.codeToHtml(code, {
    lang: language,
    theme,
  });
}
