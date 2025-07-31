# Firebase Studio

This is a NextJS starter in Firebase Studio.

The source code for this project is available on GitHub: [https://github.com/babe221-bot/web-page](https://github.com/babe221-bot/web-page)

To get started, take a look at `src/app/page.tsx`.

## Customize a 404/Not Found page

You can serve a custom `404 Not Found` error when a user tries to access a page that doesn't exist.

For Next.js applications, you should create a `not-found.tsx` file inside your `src/app` directory. This project already includes a `src/app/not-found.tsx` file that you can customize.

As a fallback for Firebase Hosting, you can also create a `public/404.html`. Firebase Hosting will display the content of this custom `404.html` page if a browser triggers a `404 Not Found` error on your domain or subdomain, especially for non-Next.js handled routes.
