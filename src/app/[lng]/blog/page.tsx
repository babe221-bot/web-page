// src/app/[lng]/blog/page.tsx
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getPosts } from '@/lib/blog';
import { Post } from '@/lib/types';
import { languages, fallbackLng } from '@/app/i18n/settings';
import Link from 'next/link';

interface BlogPageProps {
  params: {
    lng: string;
  };
}

const BlogPage: FC<BlogPageProps> = async ({ params: { lng } }) => {
  if (languages.indexOf(lng) < 0) {
    notFound();
  }

  let blogPosts = await getPosts(lng);

  if (!blogPosts || blogPosts.length === 0) {
    blogPosts = await getPosts(fallbackLng);
    lng = fallbackLng;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post: Post) => (
          <div key={post.slug} className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link href={`/${lng}/blog/${post.slug}`} className="text-blue-500 hover:underline">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
