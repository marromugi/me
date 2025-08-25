import { Root, Content } from 'mdast';

interface ReadingTimeResult {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

const WORDS_PER_MINUTE = 200;

/**
 * Extracts text content from a markdown AST node recursively
 */
function extractText(node: Content | Root): string {
  let text = '';

  // Skip code blocks for more accurate reading time
  if (node.type === 'code') {
    return '';
  }

  // Extract text from text nodes
  if (node.type === 'text') {
    return node.value;
  }

  // Extract text from inline code (but count it as simpler text)
  if (node.type === 'inlineCode') {
    return node.value;
  }

  // Recursively extract text from children
  if ('children' in node && node.children) {
    text = node.children.map((child) => extractText(child)).join(' ');
  }

  return text;
}

/**
 * Counts words in a text string
 */
function countWords(text: string): number {
  // Remove extra whitespace and split by word boundaries
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  return words.length;
}

/**
 * Calculates reading time from markdown content
 */
export function calculateReadingTime(
  content: string,
): ReadingTimeResult {
  const words = countWords(content);
  const minutes = words / WORDS_PER_MINUTE;
  const time = Math.round(minutes * 60 * 1000); // time in milliseconds
  const displayMinutes = Math.max(1, Math.round(minutes)); // At least 1 minute

  return {
    text: `${displayMinutes} min read`,
    minutes: displayMinutes,
    time,
    words,
  };
}

/**
 * Calculates reading time from a markdown AST
 */
export function calculateReadingTimeFromAST(
  root: Root,
): ReadingTimeResult {
  const text = extractText(root);
  return calculateReadingTime(text);
}
