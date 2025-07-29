// src/lib/blog.ts
import { firestore } from './firebase-admin';
import { Post } from '@/lib/types';

export async function getPosts(lng: string): Promise<Post[]> {
  const postsRef = firestore.collection(`posts/${lng}/content`);
  const snapshot = await postsRef.get();
  return snapshot.docs.map(doc => ({ slug: doc.id, ...doc.data() } as Post));
}

export async function getPost(slug: string, lng: string): Promise<Post | null> {
  const postRef = firestore.doc(`posts/${lng}/content/${slug}`);
  const doc = await postRef.get();

  if (!doc.exists) {
    return null;
  }

  return { slug, ...doc.data() } as Post;
}
