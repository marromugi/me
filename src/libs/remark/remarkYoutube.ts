import { Root, Paragraph, Text } from 'mdast';
import { visit } from 'unist-util-visit';

export interface YoutubeEmbed {
  type: 'youtubeEmbed';
  videoId: string;
  url: string;
  data?: any;
}

declare module 'mdast' {
  interface BlockContentMap {
    youtubeEmbed: YoutubeEmbed;
  }
  interface RootContentMap {
    youtubeEmbed: YoutubeEmbed;
  }
}

function extractYoutubeId(url: string): string | null {
  // Handle different YouTube URL formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
}

function isYoutubeUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url);
}

export function remarkYoutube() {
  return (tree: Root) => {
    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      let url: string | null = null;
      
      // Check if paragraph has exactly one child that is a text node
      if (
        node.children.length === 1 &&
        node.children[0].type === 'text'
      ) {
        const textNode = node.children[0] as Text;
        const text = textNode.value.trim();
        
        if (isYoutubeUrl(text)) {
          url = text;
        }
      }
      // Check if paragraph has exactly one child that is a link node with YouTube URL
      else if (
        node.children.length === 1 &&
        node.children[0].type === 'link'
      ) {
        const linkNode = node.children[0] as any;
        const linkUrl = linkNode.url;
        
        if (isYoutubeUrl(linkUrl)) {
          url = linkUrl;
        }
      }
      
      // If we found a YouTube URL, replace the paragraph with embed
      if (url && parent && typeof index === 'number') {
        const videoId = extractYoutubeId(url);
        
        if (videoId) {
          const youtubeNode: YoutubeEmbed = {
            type: 'youtubeEmbed',
            videoId,
            url,
          };
          
          parent.children[index] = youtubeNode as any;
        }
      }
    });
  };
}