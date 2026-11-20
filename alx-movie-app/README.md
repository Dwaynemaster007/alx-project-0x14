# CineSeek (ALX Project 0x14)

A movie discovery app built with Next.js (Pages Router), TypeScript and Tailwind CSS, installable as a PWA.

- `/`: landing page
- `/movies`: browse movies by year and genre, with pagination and a title search across the current page
- `pages/api/fetch-movies.ts`: a server-side API route that calls the [MoviesDatabase API on RapidAPI](https://rapidapi.com/SAdrian/api/moviesdatabase), so your key stays on the server

## Run it

```bash
npm install
cp .env.example .env.local   # add your RapidAPI key as MOVIE_API_KEY
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build with the service worker
```

Without a key the app still runs and the movies page tells you the key is missing. On Vercel, add `MOVIE_API_KEY` under Project Settings → Environment Variables.

`next-pwa` generates `public/sw.js` and the Workbox files on each build, so they're git-ignored.
