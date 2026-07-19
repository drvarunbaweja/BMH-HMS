# Auto-loaded Ophthalmology slides

Drop any `.jpg`, `.jpeg`, `.png`, or `.webp` file into this folder (via the
GitHub web UI: **Add file → Upload files**) and it will automatically show
up as a slide in the Ophthalmology media deck — no code changes needed.

- The slide title is generated from the filename. Use hyphens or
  underscores between words, e.g. `new-lasik-machine.jpg` becomes
  "New Lasik Machine".
- The image is shown full-bleed with the filename-derived title only
  (no bullet points, no attribution). For a richer slide with bullets,
  bilingual text, and photo credit, ask for it to be added to
  `src/public/assets/queue-slides.js` directly instead.
- Changes appear after the TV's browser next reloads the page (the
  display re-checks this folder automatically every couple of hours,
  and always on a fresh page load).
