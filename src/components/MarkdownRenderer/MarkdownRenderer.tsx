import { RootContent } from 'mdast';
import { Fragment, ReactElement } from 'react';
import { MarkdownRendererProps } from './type';
import { MarkdownHeading } from './blocks/MarkdownHeading';
import { MarkdownParagraph } from './blocks/MarkdownParagraph';
import { MarkdownList } from './blocks/MarkdownList';
import { MarkdownListItem } from './blocks/MarkdownListItem';
import { MarkdownBlockquote } from './blocks/MarkdownBlockquote';
import { MarkdownCode } from './blocks/MarkdownCode';
import { MarkdownInlineCode } from './blocks/MarkdownInlineCode';
import { MarkdownLink } from './blocks/MarkdownLink';
import { MarkdownImage } from './blocks/MarkdownImage';
import { MarkdownText } from './blocks/MarkdownText';
import { MarkdownEmphasis } from './blocks/MarkdownEmphasis';
import { MarkdownStrong } from './blocks/MarkdownStrong';
import { MarkdownBreak } from './blocks/MarkdownBreak';
import { MarkdownThematicBreak } from './blocks/MarkdownThematicBreak';
import { MarkdownTable } from './blocks/MarkdownTable';
import { MarkdownTableRow } from './blocks/MarkdownTableRow';
import { MarkdownTableCell } from './blocks/MarkdownTableCell';
import { MarkdownYoutubeEmbed } from './blocks/MarkdownYoutubeEmbed';

const renderNode = (
  node: RootContent,
  index: number,
  parentType?: string,
): ReactElement | null => {
  switch (node.type) {
    case 'heading':
      return (
        <MarkdownHeading key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownHeading>
      );

    case 'paragraph':
      return (
        <MarkdownParagraph key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownParagraph>
      );

    case 'list':
      return (
        <MarkdownList key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownList>
      );

    case 'listItem':
      return (
        <MarkdownListItem key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownListItem>
      );

    case 'blockquote':
      return (
        <MarkdownBlockquote key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownBlockquote>
      );

    case 'code':
      return <MarkdownCode key={index} node={node} />;

    case 'inlineCode':
      return <MarkdownInlineCode key={index} node={node} />;

    case 'link':
      return (
        <MarkdownLink key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownLink>
      );

    case 'image':
      return <MarkdownImage key={index} node={node} />;

    case 'text':
      return <MarkdownText key={index} node={node} />;

    case 'emphasis':
      return (
        <MarkdownEmphasis key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownEmphasis>
      );

    case 'strong':
      return (
        <MarkdownStrong key={index} node={node}>
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownStrong>
      );

    case 'break':
      return <MarkdownBreak key={index} node={node} />;

    case 'thematicBreak':
      return <MarkdownThematicBreak key={index} node={node} />;

    case 'table':
      return (
        <MarkdownTable key={index} node={node}>
          <tbody>
            {node.children.map((child, i) =>
              renderNode(child, i, 'table'),
            )}
          </tbody>
        </MarkdownTable>
      );

    case 'tableRow':
      const isHeaderRow = parentType === 'table' && index === 0;
      return (
        <MarkdownTableRow key={index} node={node} index={index}>
          {node.children.map((child, i) =>
            renderNode(child, i, isHeaderRow ? 'headerRow' : 'row'),
          )}
        </MarkdownTableRow>
      );

    case 'tableCell':
      return (
        <MarkdownTableCell
          key={index}
          node={node}
          index={index}
          isHeader={parentType === 'headerRow'}
        >
          {node.children.map((child, i) => renderNode(child, i))}
        </MarkdownTableCell>
      );

    case 'youtubeEmbed':
      return <MarkdownYoutubeEmbed key={index} node={node as any} />;

    default:
      return null;
  }
};

export const MarkdownRenderer = ({ root }: MarkdownRendererProps) => {
  return (
    <div className="markdown-content">
      {root.children.map((child, index) => (
        <Fragment key={index}>{renderNode(child, index)}</Fragment>
      ))}
    </div>
  );
};
