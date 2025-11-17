# Audi Q2 Rental Website

Simple, responsive single‑page website to showcase and take booking requests for an Audi Q2 rental. Built with plain HTML/CSS/JS, easy to customize and deploy (e.g., GitHub Pages).

## Features
- Clean, mobile‑first landing page
- Car highlights/specs and simple pricing cards
- Booking form (via FormSubmit – no backend required)
- Gallery with a lightweight JS lightbox
- Accessible navigation with mobile menu

## Quick Start
Open `index.html` in your browser. That’s it.

Optionally use a static server for live reload:

```bash
# Python (3.x)
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Customize
- Branding: update the site name and links in `index.html` header.
- Pricing: edit the cards in the `#pricing` section of `index.html`.
- Specs/Content: update the `#car` section and hero copy.
- Images: replace Unsplash URLs in the `#gallery` and hero with your own photos.
- Colors/Theme: adjust CSS variables in `assets/css/styles.css` under `:root`.

## Booking Form (FormSubmit)
The booking form posts to FormSubmit so you receive requests by email without a backend.

1. In `index.html`, search for `formsubmit` and replace `YOUREMAIL@example.com` with your email.
2. First submission may ask you to confirm the email with FormSubmit.
3. You can add hidden fields (see formsubmit.co docs) for redirects or spam protection.

If you prefer WhatsApp: replace the form with a CTA link like `https://wa.me/<number>?text=...`.

## Deploy (GitHub Pages)

Two supported options. Use whichever you prefer.

Option A — Deploy from a branch (simplest)

1. Push this repo to GitHub.
2. Settings → Pages → Build and deployment → Source: "Deploy from a branch".
3. Branch: `gh-pages`, Folder: `/ (root)`, then Save.
4. Your site will publish at `https://<your-user>.github.io/<repo>/`.

Option B — Deploy via GitHub Actions (already included)

1. Settings → Pages → Build and deployment → Source: "GitHub Actions", then Save.
2. Push to `main` to trigger the workflow `.github/workflows/pages.yml`.
3. Check the Actions tab for the Pages deployment run.

Troubleshooting

- 404 after deploy? Ensure Pages is enabled (Settings → Pages) and the correct source is selected.
- Custom domain: Add your domain in Settings → Pages and create a `CNAME` DNS record pointing to `<your-user>.github.io`.

Alternatively host on Netlify, Vercel, Cloudflare Pages, or any static host.

## Notes
- Demo photos use Unsplash and are for placeholder purposes. Replace with your Audi Q2 images.
- No tracking or analytics included by default.

## Structure

```text
index.html
assets/
  css/styles.css
  js/main.js
```

## License

This website template is provided as‑is for your use. Replace imagery and content with your own.
