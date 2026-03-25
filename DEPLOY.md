# GitHub Pages Deployment Instructions

## Quick Deploy Steps:

### 1. Clone your GitHub repository (if not already done):
```bash
git clone https://github.com/Sumedh1599/demo_siteee.git
cd demo_siteee
```

### 2. Remove all existing files (overwrite completely):
```bash
rm -rf * .gitignore
```

### 3. Copy the built files:
```bash
cp -r /Volumes/NolinkSSD/Reverse\ engineer/dist/* .
```

### 4. Add and push to GitHub:
```bash
git add .
git commit -m "Deploy Verbll AI - Personalized Learning Platform"
git push origin main
```

### 5. Enable GitHub Pages (critical — wrong folder breaks the site):

The repository root contains **Vite’s dev** `index.html`, which loads `/src/main.jsx`. Browsers require `application/javascript` for module scripts; raw `.jsx` is served as `text/jsx`, which causes: *“Failed to load module script… MIME type text/jsx”*.

**Always publish the built site folder, not the repo root.**

1. Go to your repository: https://github.com/Sumedh1599/demo_siteee
2. Click **Settings** → **Pages**
3. **Source:** Deploy from a branch
4. **Branch:** `main`
5. **Folder:** **`/demo_siteee`** (not `/ (root)`)
6. Click **Save**

If you use a **custom domain** (e.g. www.verbll.com), keep **`demo_siteee/CNAME`** as-is; it must live in the folder you publish.

## Your site will be live at:
https://sumedh1599.github.io/demo_siteee/ (unless you use a custom domain)

## What's included:
✅ SEO-optimized HTML with meta tags
✅ Sitemap.xml for Google
✅ Robots.txt for search engines
✅ All assets (images, icons, fonts)
✅ Optimized CSS and JS
✅ SSL certificate (automatic)
✅ Responsive design

## Note about CNAME:
If you have a custom domain, make sure your CNAME file is in the dist folder before copying.

## Troubleshooting: “MIME type text/jsx” / module script failed

- **Cause:** GitHub Pages (or your host) is serving the **repository root** `index.html`, which points at **`/src/main.jsx`**. That file is raw source, not a bundled script.
- **Fix:** Set Pages **folder** to **`/demo_siteee`** (or deploy only the contents of **`dist/`** after `npm run build`).
- **Cloudflare:** Purge cache after fixing Pages so clients do not keep an old HTML response.

## Optional: GitHub Actions deploy

This repo includes `.github/workflows/pages.yml`, which uploads **only** the `demo_siteee/` folder. To use it:

1. **Settings** → **Pages** → **Build and deployment** → **Source:** **GitHub Actions** (not “Deploy from a branch”).
2. Push to `main`; the workflow publishes `demo_siteee` and avoids the root `index.html` mistake.

Do **not** use “Deploy from branch → `/ (root)`” at the same time as expecting a working production site.
