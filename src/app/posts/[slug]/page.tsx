import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getRelativeTimeString } from '@/utils/date';
import { calculateReadingTimeFromAST } from '@/utils/reading-time';
import clsx from 'clsx';
import { getAllSlugs, getPostContent } from '@/features/posts';
import { MarkdownThematicBreak } from '@/components/MarkdownRenderer/blocks/MarkdownThematicBreak';
import Link from 'next/link';
import { Flex } from '@/components/layouts/Flex';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter, content } = await getPostContent(slug);
  const readingTime = calculateReadingTimeFromAST(content);

  return {
    title: frontmatter.title
      ? `${frontmatter.title} | marromugi`
      : 'Resume | marromugi',
    description: frontmatter.description || 'こんにちは',
    openGraph: {
      title: frontmatter.title || 'Resume',
      description: frontmatter.description || 'こんにちは',
      type: 'website',
      images: frontmatter.cover
        ? [
            {
              url: frontmatter.cover,
              width: 1200,
              height: 630,
              alt: frontmatter.title || 'Resume',
            },
          ]
        : undefined,
    },
    twitter: {
      card: frontmatter.cover ? 'summary_large_image' : 'summary',
      title: frontmatter.title || 'marromugi',
      description: frontmatter.description || 'こんにちは',
      images: frontmatter.cover ? [frontmatter.cover] : undefined,
    },
    other: {
      ...(frontmatter.releaseDate && {
        'article:published_time': new Date(
          frontmatter.releaseDate,
        ).toISOString(),
      }),
      'twitter:label1': 'Reading time',
      'twitter:data1': readingTime.text,
    },
  };
}

export default async function ResumePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { frontmatter, content, metadata } = await getPostContent(slug);

  if (frontmatter.draft && process.env.NODE_ENV === 'production') {
    redirect('/');
  }

  return (
    <div className="min-h-screen relative">
      {frontmatter.draft && (
        <span className="fixed right-4 top-4 font-sans px-4 py-2 text-sm rounded-full bg-red-600 text-white font-semibold">
          下書き
        </span>
      )}
      <div className="max-w-[42em] mx-auto px-2 py-8 sm:px-6 lg:px-8">
        <Flex center>
          <img
            src={frontmatter.cover}
            alt={frontmatter.title || 'Cover image'}
            className="rounded-lg max-h-[360px] object-contain"
          />
        </Flex>
        <h1
          className={clsx('font-semibold font-title text-2xl', 'mt-10')}
        >
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-1 mt-4">
          <span className="text-gray-600">{metadata.relativeTime}</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">
            {metadata.readingTime.minutes} min read
          </span>
        </div>
        <div className="p-2 pt-1 border-dashed border-gray-600 border-l mt-8">
          <span className="block font-title font-semibold">まとめ</span>
          <span className="text-sm block mt-2">
            {frontmatter.description}
          </span>
        </div>
        <MarkdownRenderer root={content} />
        <MarkdownThematicBreak node={{ type: 'thematicBreak' }} />
        <Link
          href={'/'}
          className="block mx-auto text-sm w-full text-center"
        >
          記事一覧に戻る
        </Link>
      </div>
    </div>
  );
}
