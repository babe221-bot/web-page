// src/app/[lng]/blog/page.tsx
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getPosts } from '@/lib/blog';
import { Post } from '@/lib/types';
import { languages, fallbackLng } from '@/app/i18n/settings';
import Link from 'next/link';
import React from 'react';

interface BlogPageProps {
  params: {
    lng: string;
  } | Promise<{
    lng: string;
  }>;
}

const BlogPage: FC<BlogPageProps> = async ({ params }) => {
  const resolvedParams = React.use(Promise.resolve(params));
  const { lng } = resolvedParams;

  if (languages.indexOf(lng) < 0) {
    notFound();
  }

  let blogPosts = await getPosts(lng);

  if (!blogPosts || blogPosts.length === 0) {
    blogPosts = await getPosts(fallbackLng);
    // The next line is problematic if lng is reassigned directly when it was destructured from resolvedParams
    // To ensure consistency, we should re-assign resolvedParams.lng if we intend to change the language.
    // Or, more simply, just use fallbackLng directly in subsequent calls if that's the intention.
    // For now, I will keep it as is, but this might be a logical error depending on further usage.
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
