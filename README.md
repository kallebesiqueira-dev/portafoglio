# Kallebe Gallo Portfolio

A multilingual personal portfolio website focused on modern UI, performance, and responsive design.

## Overview

This project is a static portfolio built with:

- HTML5
- CSS3
- Vanilla JavaScript

Main features:

- Hero section with animated typing effect
- Language switcher (Italian, German, French, English)
- Featured GitHub projects section with live demos, source links and tech stack tags
- Client reviews marquee
- Responsive layout for desktop, tablet, and mobile
- Social/contact links and WhatsApp floating action button

## Project Structure

- `index.html`: Main page structure and interactive scripts
- `css.css`: Full visual styling and responsive behavior
- `img/`: Portfolio preview images

## Local Preview

Because this is a static project, you can open `index.html` directly in your browser.

For a better development workflow, use a local server extension (for example, Live Server in VS Code).

## Deploy to Vercel

This project is ready for Vercel as a static site.

### Option 1: Vercel Dashboard

1. Push the project to a GitHub repository.
2. Go to Vercel and click **Add New -> Project**.
3. Import the GitHub repository.
4. Keep default settings (Framework Preset: `Other`).
5. Click **Deploy**.

### Option 2: Vercel CLI

```bash
npm i -g vercel
vercel
```

Then follow the CLI prompts.

## Publish to GitHub

If your folder is not a Git repository yet:

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio release"
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If your repository already exists, just run:

```bash
git add .
git commit -m "Update portfolio"
git push
```

## Notes

- The language selected by the user is saved in `localStorage`.
- The default page language is Italian (`<html lang="it">`).

## License

This project is available for personal and professional portfolio use.