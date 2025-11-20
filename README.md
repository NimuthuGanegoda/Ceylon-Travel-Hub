# Ceylon Drive Hub

A modern, responsive car rental website built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🚗 Modern single-page application (SPA) architecture
- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🌓 Dark/Light theme toggle
- 📱 Fully responsive design
- ♿ Accessible navigation and components
- 🔄 Smooth scrolling and animations
- 📊 Dynamic vehicle and testimonial sections

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Static export ready for GitHub Pages

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
# Build static export
npm run build

# The static files will be in the `out` directory
```

## Deployment

### GitHub Pages

1. Update `next.config.js` with your repository name:
   ```js
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : ''
   ```

2. Build and export:
   ```bash
   npm run build
   ```

3. Deploy the `out` directory to GitHub Pages using GitHub Actions or manually.

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with navigation and theme
│   ├── page.tsx          # Main homepage with all sections
│   └── globals.css       # Global styles and Tailwind
├── components/
│   ├── NavBar.tsx        # Navigation component
│   ├── Footer.tsx        # Footer component
│   ├── Section.tsx       # Reusable section wrapper
│   └── ThemeToggle.tsx   # Dark/light mode toggle
└── data/
    └── siteData.ts       # Site content and data models
```

## Customization

### Update Content

Edit `src/data/siteData.ts` to update:
- Vehicles
- Testimonials
- Services
- Contact information
- Site metadata

### Update Styling

- Colors: Edit `tailwind.config.ts`
- Global styles: Edit `src/app/globals.css`
- Component styles: Use Tailwind classes directly in components

### Add New Sections

1. Create a new section component in `src/components/`
2. Import and use it in `src/app/page.tsx`
3. Add navigation link in `NavBar.tsx`

## Forms Integration

The booking and contact forms are currently client-side only. To make them functional:

1. **Google Apps Script** (as per original setup):
   - Keep the original Apps Script backend
   - Add `action` attribute to forms pointing to your script URL
   - Add AJAX handling in a `useEffect` or form handler

2. **Modern API Route** (recommended for Next.js):
   - Create API routes in `src/app/api/`
   - Use server actions or API routes to handle form submissions
   - Integrate with your email service or database

## License

Provided as-is for customization. Replace placeholder imagery and verify legal compliance for fonts, photos, and data.

## Credits

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Placeholder images from [Unsplash](https://unsplash.com/)
