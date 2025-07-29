// src/lib/types.ts

/**
 * Represents a blog post.
 */
export interface Post {
  /**
   * The unique identifier for the post (URL-friendly).
   */
  slug: string;
  /**
   * The title of the post.
   */
  title: string;
  /**
   * A short summary of the post.
   */
  excerpt: string;
  /**
   * The full HTML content of the post.
   */
  content: string;
}
