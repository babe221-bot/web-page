// src/app/[lng]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Post, posts } from '@/lib/blog';
import { languages, fallbackLng } from '@/app/i18n/settings';

interface BlogPostPageProps {
  params: {
    lng: string;
    slug: string;
  };
}

const BlogPostPage: FC<BlogPostPageProps> = ({ params: { lng, slug } }) => {
  if (languages.indexOf(lng) < 0) {
    notFound();
  }
  if (!posts[lng]) {
    lng = fallbackLng;
  }

  const post = posts[lng].find((p: Post) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default BlogPostPage;
