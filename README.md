# AutoTrack

A Next.js news site with a full admin dashboard for publishing articles.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Admin

Go to `/admin/login` — default password is `autotrack`.

To change the password, copy `.env.local.example` to `.env.local` and set `ADMIN_PASSWORD`.

```env
ADMIN_PASSWORD=your-secure-password-here
```

## Features

- Homepage with hero, grid, and category sections
- Breaking-news ticker
- Article pages with related stories sidebar
- Category pages (News, Politics, Business, Sports, Entertainment, World)
- Admin dashboard: create, edit, delete articles
- Photo uploads (stored in `public/uploads/`)
- Password-protected admin area

## Structure

```
src/
  app/
    page.js              — Homepage
    article/[slug]/      — Article pages
    category/[slug]/     — Category pages
    admin/               — Admin dashboard
      login/             — Login page
      new/               — New article
      edit/[id]/         — Edit article
    api/
      articles/          — POST create
      articles/[id]/     — PUT update, DELETE
      upload/            — POST image upload
      login/             — POST login
      logout/            — POST logout
  components/            — Header, Footer, ArticleCard, ArticleForm, Ticker
  lib/                   — articles.js (data), auth.js, constants.js, slug.js
data/
  articles.json          — All articles stored here
public/
  uploads/               — Uploaded photos stored here
```

## Deploy

Works on Vercel (note: uploads to `public/uploads/` are ephemeral on serverless — for production, replace the upload handler with Cloudinary, S3, or similar).
# AutoTrack
# autotrack
