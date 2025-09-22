import { getAllPosts } from '@/features/posts';
import clsx from 'clsx';
import Link from 'next/link';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col gap-4 w-full max-w-[40em] mx-auto pt-4">
        <p className="text-sm">
          普段はフロントエンドの実装をしています。
        </p>
        <p></p>
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/posts/${p.slug}`}
            className={clsx(
              'p-4 rounded-xl',
              'border border-gray-200',
              'bg-white transition-all',
            )}
          >
            <div className="flex gap-3 justify-between">
              <div>
                <span className="font-semibold font-title text-sm">
                  {p.frontmatter.title ?? 'xx'}
                </span>
                <span className="block flex gap-2 text-gray-500">
                  <span>
                    {p.metadata.relativeTime},{'  '}
                    {p.metadata.readingTime.minutes} min read
                  </span>
                </span>
              </div>
              <img
                width={64}
                height={32}
                src={p.frontmatter.cover ?? ''}
                className="object-cover rounded-md w-16 h-12"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
