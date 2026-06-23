# jessejaanilacom

Personal homepage — a tiny static site: one page with a multilingual animated
welcome heading, a short bio, and social links. Built and served with Vite 8
(Rolldown bundler + Oxc minifier).

## Commands

- `npm run dev` — Vite dev server with hot reload
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally
- `npm run lint` — oxlint
- `npm run format` — oxfmt (writes in place; add `--check` to verify only)

Node version is pinned in `.nvmrc` (24); Vite 8 requires `^20.19 || >=22.12`.

## Layout

- `index.html` — the only page: `<h1 id="welcomeMessage">`, a bio section with
  links, a footer. Loads `src/script.js` as a module.
- `src/script.js` — the welcome animation. Cycles through `welcomeMessages`
  (9 greetings); for each, it splits the text into `<span class="char">` letters
  and reveals them one at a time with the Web Animations API — a staggered 3D
  `rotateX` flip in, a hold, then a flip/fade out — looping forever. Falls back
  to a plain cross-fade under `prefers-reduced-motion`.
- `src/styles.css` — system-font typography with fluid sizing; a `mix-blend-mode`
  radial-gradient wash over the `<h1>` and on link hovers (guarded by
  `@supports (mix-blend-mode)`). `.char` is `inline-block` and the `<h1>` sets
  `perspective` so the per-letter flip renders in 3D.
- `public/favicon.ico` — copied to the build root as-is.
- `vite.config.js` — `target: 'esnext'`, module-preload polyfill off. JS minify
  (Oxc) and CSS minify (Lightning CSS) are Vite 8 defaults, so they're neither
  configured nor listed as dependencies.

## Toolchain

Everything is the Oxc family: Vite 8 (Rolldown + Oxc) for build/dev, `oxlint`
for linting (`.oxlintrc.json`), and `oxfmt` for formatting (`.oxfmtrc.json` — no
semicolons, single quotes, width 120). No ESLint, Prettier, terser, or
lightningcss packages; Vite 8 owns the minifiers.

## Deployment

No CI or deploy configuration lives in the repo. Remote: `Jaanilj/jessejaanilacom`.
