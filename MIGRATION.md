# Migration Summary: HTML to Next.js

## What Changed

Your website has been completely modernized from a multi-page HTML site to a modern Next.js single-page application (SPA), similar to your portfolio at https://github.com/NimuthuGanegoda/NimuthuGanegoda.

### Before
- Multiple HTML files (index.html, about.html, gallery.html, etc.)
- Vanilla JavaScript in assets/js/main.js
- Custom CSS in assets/css/styles.css
- JSON data files loaded dynamically

### After
- ✅ Single-page Next.js 14 application
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for modern styling
- ✅ React components for reusability
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Static export ready for GitHub Pages

## New Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout (navigation, footer, theme)
│   ├── page.tsx           # Main homepage (all sections)
│   └── globals.css        # Tailwind + custom styles
├── components/
│   ├── NavBar.tsx         # Sticky navigation with smooth scroll
│   ├── Footer.tsx         # Site footer
│   ├── Section.tsx        # Reusable section wrapper
│   └── ThemeToggle.tsx    # Dark/light mode toggle button
└── data/
    └── siteData.ts        # All content (vehicles, testimonials, services)
```

## Key Features

1. **Modern Tech Stack**
   - Next.js 14 with App Router
   - TypeScript for better development experience
   - Tailwind CSS for utility-first styling

2. **Better Performance**
   - Static generation (faster loading)
   - Optimized images (when using next/image)
   - Smaller bundle sizes

3. **Enhanced UX**
   - Smooth scrolling navigation
   - Dark/Light theme toggle
   - Mobile-responsive design
   - Better accessibility

4. **Developer Experience**
   - Component-based architecture
   - Type safety with TypeScript
   - Hot reload during development
   - Easy to maintain and extend

## How to Use

### Development
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:3000
```

### Production Build
```bash
npm run build    # Build static site to `out/` directory
```

### Deployment to GitHub Pages

1. **Update Repository Name**
   Edit `next.config.js` line 3:
   ```js
   basePath: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME' : '',
   ```

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Source: GitHub Actions
   - The workflow is already configured in `.github/workflows/deploy.yml`

3. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Modernize to Next.js"
   git push origin main
   ```

4. **Site Will Deploy Automatically**
   - Your site will be available at: `https://yourusername.github.io/repo-name/`

## Customization Guide

### Update Content

Edit `src/data/siteData.ts`:
- Change contact info
- Add/remove vehicles
- Update testimonials
- Modify services

### Change Colors

Edit `tailwind.config.ts`:
```ts
colors: {
  brand: {
    DEFAULT: '#bb0a30',  // Your main color
    light: '#ff2e4d',    // Lighter variant
    dark: '#8a0723',     // Darker variant
  },
}
```

### Add New Sections

1. Create component in `src/components/YourSection.tsx`
2. Import in `src/app/page.tsx`
3. Add link to `NavBar.tsx`

### Forms Integration

The forms are currently client-side only. To make them work:

**Option 1: Use Next.js API Routes**
```bash
# Create API route
src/app/api/contact/route.ts
```

**Option 2: Keep Google Apps Script**
- Add `action` attribute to forms
- Use `fetch()` to submit data
- Handle response in React

## Removed Files

These are no longer needed:
- ❌ index.html
- ❌ about.html
- ❌ contact.html
- ❌ gallery.html
- ❌ testimonials.html
- ❌ assets/css/styles.css
- ❌ assets/js/main.js

Data files preserved:
- ✅ assets/data/vehicles.json (converted to TypeScript)
- ✅ assets/data/testimonials.json (converted to TypeScript)

## Next Steps

1. **Test the site locally:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

2. **Update the repository name** in `next.config.js`

3. **Customize content** in `src/data/siteData.ts`

4. **Update colors/styling** in `tailwind.config.ts`

5. **Test dark/light mode** with the theme toggle button

6. **Deploy to GitHub Pages** following the steps above

## Need Help?

- Next.js docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

Your site is now modern, maintainable, and ready for production! 🚀
