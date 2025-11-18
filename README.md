# Ceylon Drive Hub Website

Responsive multi‑vehicle rental landing site (currently Audi Q2 sample) with booking‑first workflow, dynamic vehicle & testimonial loading, automatic system dark/light theming (prefers-color-scheme), and optional Google Sheets + email integration via Apps Script.

## Features
- Booking‑first hero flow (choose exact vehicle after confirmation)
- Dynamic vehicles grid fed by `assets/data/vehicles.json`
- Full specification accordion (Audi Q2 sample) and generalized features section
- Pricing cards with live currency conversion (USD base → selectable currencies)
- Testimonials (list + submission page) merging sample data with local preview storage
- Accessible navigation, mobile menu, skip link, scroll progress, section reveal animations
- Automatic dark/light theme via operating system preference (no manual toggle)
- Google Sheets + Email integration (replace placeholder macro URL)
- Clean, mobile‑first responsive design

## Quick Start
Open `index.html` in your browser. That’s it.

Optionally use a static server for live reload:

```bash
# Python (3.x)
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Customize
- Branding: update `<title>`, `.brand` text, and meta descriptions.
- Vehicles: add entries to `assets/data/vehicles.json` (status: `available` or `coming-soon`).
- Pricing: edit amounts (data-base USD) in the `#pricing` section of `index.html`.
- Specs: adjust/remove accordion sections inside `#full-specs` if adding other models.
- Images: replace Unsplash placeholders (hero + gallery) with licensed media.
- Colors/Theme: adjust CSS variables in `assets/css/styles.css` under `:root` and Apple variant block.
- Testimonials: seed initial data in `assets/data/testimonials.json` or remove if not needed.
- Global Background: add/remove the `with-bg` class on `<body>` to enable the scenic background layer. Change the Unsplash URL in `styles.css` (`body.with-bg`).

## Booking / Contact / Testimonial Forms (Google Sheets + Email)
Forms are configured to post to a Google Apps Script Web App (placeholder `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`). The front‑end already intercepts these submissions with a generic AJAX handler (see `assets/js/main.js`) so users stay on the page and get inline success/error messages. You can remove the `data-ajax="true"` attribute to fall back to default POST behavior.

### Setup Steps
1. Create a new Google Sheet named `Ceylon Drive Hub`.
2. Add three tabs: `Bookings`, `Contacts`, `Testimonials`.
3. In Extensions → Apps Script, replace the default code with the script below.
4. Fill in `SHEET_ID` (found in the Sheet URL) and `RECIPIENT_EMAIL`.
5. Deploy: Deploy → New deployment → Web app:
   - Execute as: Me
   - Who has access: Anyone
   - Copy the Web App URL (ends with `/exec`) and replace `YOUR_DEPLOYMENT_ID` in the HTML forms.
6. Test a submission; verify a new row appears and email arrives.

### Apps Script Code
```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const RECIPIENT_EMAIL = 'you@example.com';

function doPost(e) {
  try {
    const params = e.parameter;
    const type = (params.type || '').toLowerCase();
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const now = new Date();
    let sheet;
    if (type === 'booking') sheet = ss.getSheetByName('Bookings');
    else if (type === 'contact') sheet = ss.getSheetByName('Contacts');
    else if (type === 'testimonial') sheet = ss.getSheetByName('Testimonials');
    else sheet = ss.getSheetByName('Contacts'); // fallback

    // Ensure headers exist (runs once)
    if (sheet.getLastRow() === 0){
      const headers = type === 'booking' ? ['Timestamp','Name','Email','Phone','Pickup Date','Return Date','Pickup Location','Return Location','Service','Notes']
        : type === 'contact' ? ['Timestamp','Name','Email','Message']
        : type === 'testimonial' ? ['Timestamp','Name','Country','Rating','Message','Permission']
        : ['Timestamp','Name','Email','Message'];
      sheet.appendRow(headers);
    }

    if (type === 'booking') {
      sheet.appendRow([
        now, params.name, params.email, params.phone, params.pickup_date,
        params.return_date, params.pickup_location, params.return_location,
        params.service, params.message
      ]);
    } else if (type === 'contact') {
      sheet.appendRow([now, params.name, params.email, params.message]);
    } else if (type === 'testimonial') {
      sheet.appendRow([now, params.name, params.country, params.rating, params.message, params.permission]);
    } else {
      sheet.appendRow([now, params.name, params.email, params.message]);
    }

    // Email notification summary
    const subject = `New ${type || 'submission'} received`;
    const body = Object.keys(params).map(k => `${k}: ${params[k]}`).join('\n');
    MailApp.sendEmail(RECIPIENT_EMAIL, subject, body);

    return ContentService.createTextOutput(JSON.stringify({status:'ok'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({status:'error',message:err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Front-End Notes
- Hidden `<input name="type" value="booking|contact|testimonial">` already added to each form.
- AJAX handler auto‑detects forms with `data-ajax="true"` and posts using `fetch`; remove that attribute to disable.
- Honeypot field `_honey` is present on all forms for spam mitigation (ignored if blank; submission blocked if filled).
- Success and error messages surface via `.form-note` elements (ARIA live region for accessibility).
- To customize UI feedback, edit the `setupAjaxForms()` function in `assets/js/main.js`.

### Optional: Disable AJAX
Remove `data-ajax="true"` from a form; the browser will then navigate (might show raw JSON). For a redirect, modify Apps Script to return an HTML page or add a meta refresh.

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
- Demo photos use Unsplash placeholders; replace with your own media before production.
- Specs are reference only; verify locally for accuracy.
- No tracking/analytics included by default.
- Currency conversion uses exchangerate.host (public API) — consider caching or server proxy for production reliability.
- Scenic background enabled via `with-bg` body class; change or compress large images to maintain mobile performance. Provide a 1920px wide optimized JPEG (~250 KB) for production.
- Legacy pages (`about.html`, `contact.html`, `gallery.html`) still show previous brand; update their `<title>`, `.brand`, and any copy or delete if consolidating into single page.
- Accessibility: skip link, focusable controls, and live region messages included; ensure color contrast remains ≥ WCAG AA if changing palette.

## Launch Checklist
1. Replace Apps Script URL (`YOUR_DEPLOYMENT_ID`) in all forms.
2. Deploy Apps Script with updated `SHEET_ID` and `RECIPIENT_EMAIL`.
3. Update legacy page branding or remove pages if not needed.
4. Replace all placeholder images (hero, gallery, vehicle thumbs, background) with licensed assets.
5. Verify currency conversion API reachable from hosting environment.
6. Test all form submissions on desktop + mobile (success + validation paths).
7. Add analytics or consent banner if required by region (optional).
8. Set up custom domain (DNS + GitHub Pages) if desired.

## Structure

```text
index.html                Main landing page (booking-first workflow)
testimonials.html         Dedicated testimonials submission/list view
about.html / contact.html Legacy pages (can be realigned or removed)
assets/
  css/styles.css          Styles + theme variants
  js/main.js              Interaction, dynamic loaders, currency, testimonials
  data/vehicles.json      Vehicle listing (editable)
  data/testimonials.json  Sample testimonials dataset
```

## License

Provided as‑is for customization. Replace placeholder imagery and verify legal compliance for fonts, photos, and data.
