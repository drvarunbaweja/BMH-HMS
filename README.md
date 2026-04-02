# BMH-HMS

Hospital management frontend for Baweja Multispeciality Hospital (Vite + Firebase).

## Run on any PC (development)

1. Install [Node.js](https://nodejs.org/) (LTS, e.g. v18+).
2. Clone the repo:
   ```bash
   git clone https://github.com/drvarunbaweja/BMH-HMS.git
   cd BMH-HMS
   ```
3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```
4. Open the app in the browser. This project uses a Vite `base` of `/BMH-HMS/`, so use:
   - **http://localhost:3000/BMH-HMS/**  
   (Port may differ; check the terminal output.)

Do **not** open `src/index.html` directly from disk — ES modules and Firebase need the Vite dev server.

## Production build

```bash
npm run build
```

Static output is in `dist/`. Deploy that folder to any static host (Firebase Hosting, Netlify, Vercel, IIS, nginx, etc.).

## GitHub Pages

1. In `vite.config.js`, `base` is set to `/BMH-HMS/` so the app works at:
   - `https://drvarunbaweja.github.io/BMH-HMS/`
2. Build (`npm run build`), then publish the contents of **`dist/`** to the `gh-pages` branch or use a GitHub Action that deploys `dist` to Pages.
3. In the repo **Settings → Pages**, choose the source (e.g. `gh-pages` / GitHub Actions).

## Firebase

Auth and Firestore configuration live in `src/js/firebase.js`. For your own Firebase project, replace the config object with values from the Firebase console and deploy Firestore/security rules as needed.

## Repository

Remote: `https://github.com/drvarunbaweja/BMH-HMS`
