// scripts/migrate-blog.mjs
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('../serviceAccountKey.json');

// Replace the newline characters in the private key
serviceAccount.private_key = process.env.SA_PRIVATE_KEY.replace(/
/g, '
');

initializeApp({
  credential: cert(serviceAccount),
});

const firestore = getFirestore();

const posts = {
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

async function migrate() {
  for (const lng in posts) {
    const lngPosts = posts[lng];
    for (const post of lngPosts) {
      const { slug, ...postData } = post;
      await firestore.collection(`posts/${lng}/content`).doc(slug).set(postData);
    }
  }
}

migrate().then(() => console.log('Migration complete.'));
