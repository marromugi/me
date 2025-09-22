import { MarkdownYoutubeEmbedProps } from './type';

export const MarkdownYoutubeEmbed = ({ node }: MarkdownYoutubeEmbedProps) => {
  return (
    <div className="my-8 relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${node.videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};