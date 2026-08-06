# BYU FROST Lab Website
(Built from the 🚀 [AstroWind](https://astrowind.vercel.app) template with 
[![Stars](https://img.shields.io/github/stars/arthelokyo/astrowind.svg?style=social&label=stars&maxAge=86400&color=ff69b4)](https://github.com/arthelokyo/astrowind)
and
[![Forks](https://img.shields.io/github/forks/arthelokyo/astrowind.svg?style=social&label=forks&maxAge=86400&color=ff69b4)](https://github.com/arthelokyo/astrowind))



## Adding Your Profile

Follow the full instructions in our lab GitBook [here](https://app.gitbook.com/o/1ESwthWZHNPVSuEtOXjQ/s/o7usPR5Ef8jWOkNfognF/the-basics/welcome) to add your profile to the lab webpage.

## Building Locally

You can run the website locally with
```
docker compose build
docker compose up
```
Then navigate to localhost:8080 to view the website.

To enable Google Analytics, set the public build-time env var `PUBLIC_GA_ID` to your GA4 measurement ID. Leave it unset to keep analytics disabled, which is the default behavior for forks.

### Upgrade notes

- Astro 6 requires Node 22.12 or newer. Docker and `.nvmrc` use the latest Node 22 release, while the Pages action uses its Node 22 default. Recheck these runtime choices at Node 22 end-of-life or the next Astro major upgrade.
- Tailwind 4 is loaded through `@tailwindcss/vite`, Astro's recommended integration. Do not switch back to `@astrojs/tailwind` unless the project intentionally returns to Tailwind 3 for older-browser support.
- `src/assets/styles/tailwind.css` temporarily preserves Tailwind 3's border, placeholder, and button-cursor defaults. Remove that compatibility layer only after replacing those implicit styles with explicit utilities and visually checking the site.
- SEO metadata and Google Analytics are local components because the previous `@astrolib` packages only support Astro through version 5. Revisit them only when adopting a maintained replacement or when those packages add support for the current Astro major.
- After dependency changes, recreate Compose's anonymous `node_modules` volume with `docker compose up --build --renew-anon-volumes`.

### Project structure

Inside the project, you'll see the following folders and files:

```
/
├── public/
│   ├── _headers
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── favicons/
│   │   ├── images/
│   │   └── styles/
│   │       └── tailwind.css
│   ├── components/
│   │   ├── blog/
│   │   ├── common/
│   │   ├── ui/
│   │   ├── widgets/
│   │   │   ├── Header.astro
│   │   │   └── ...
│   │   ├── CustomStyles.astro
│   │   ├── Favicons.astro
│   │   └── Logo.astro
│   ├── content/
│   │   ├── post/
│   │   │   ├── post-slug-1.md
│   │   │   ├── post-slug-2.mdx
│   │   │   └── ...
│   │   └-- config.ts
│   ├── layouts/
│   │   ├── Layout.astro
│   │   ├── MarkdownLayout.astro
│   │   └── PageLayout.astro
│   ├── pages/
│   │   ├── [...blog]/
│   │   │   ├── [category]/
│   │   │   ├── [tag]/
│   │   │   ├── [...page].astro
│   │   │   └── index.astro
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├-- rss.xml.ts
│   │   └── ...
│   ├── utils/
│   ├── config.yaml
│   └── navigation.js
├── package.json
├── astro.config.ts
└── ...
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory if they do not require any transformation or in the `assets/` directory if they are imported directly.

<br>

### Commands

If running the stack natively, you can run these commands from the root of the project, from a terminal:

| Command             | Action                                             |
| :------------------ | :------------------------------------------------- |
| `npm install`       | Installs dependencies                              |
| `npm run dev`       | Starts local dev server at `localhost:4321`        |
| `npm run build`     | Build your production site to `./dist/`            |
| `npm run preview`   | Preview your build locally, before deploying       |
| `npm run check`     | Check your project for errors                      |
| `npm run fix`       | Run Eslint and format codes with Prettier          |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro preview` |

<br>

### Linting
docker compose run --rm astrowind npm run check:eslint


#### Customize Design

To customize Font families, Colors or more Elements refer to the following files:

- `src/components/CustomStyles.astro`
- `src/assets/styles/tailwind.css`


## Acknowledgements

Initially created by **Arthelokyo** and maintained by a community of [contributors](https://github.com/arthelokyo/astrowind/graphs/contributors).

## License

**AstroWind** is licensed under the MIT license — see the [LICENSE](./LICENSE.md) file for details.
