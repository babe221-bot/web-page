// src/lib/blog.ts
export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export const posts: { [key: string]: Post[] } = {
  en: [
    {
      slug: 'first-post',
      title: 'My First Post',
      excerpt: 'This is the excerpt for my first post.',
      content: '<p>This is the full content of my first post.</p>',
    },
    {
      slug: 'second-post',
      title: 'My Second Post',
      excerpt: 'This is the excerpt for my second post.',
      content: '<p>This is the full content of my second post.</p>',
    },
  ],
  sr: [
    {
      slug: 'prvi-post',
      title: 'Moj Prvi Post',
      excerpt: 'Ovo je izvod za moj prvi post.',
      content: '<p>Ovo je pun sadržaj mog prvog posta.</p>',
    },
    {
      slug: 'drugi-post',
      title: 'Moj Drugi Post',
      excerpt: 'Ovo je izvod za moj drugi post.',
      content: '<p>Ovo je pun sadržaj mog drugog posta.</p>',
    },
  ],
};
