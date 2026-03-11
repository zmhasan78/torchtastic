# Torchtastic — Decap CMS Setup Guide

## What Is This?

Decap CMS (formerly Netlify CMS) adds a visual content editor to the Torchtastic website.
George (or any client) can log in at `torchtastic.com/admin` and update text, swap photos,
add programs, and manage content — no code required.

**Cost: $0** — Decap CMS is open-source, Netlify Identity free tier supports up to 1,000 users.

---

## Setup Steps (One-Time, ~15 minutes)

### 1. Push to GitHub

The site needs to be in a GitHub repo for the CMS to save changes.

```bash
cd torchtastic
git init
git add .
git commit -m "Initial Torchtastic site with Decap CMS"
git remote add origin https://github.com/YOUR-USERNAME/torchtastic.git
git push -u origin main
```

### 2. Connect Netlify to GitHub

1. Log in to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Select **GitHub** and choose the `torchtastic` repo
4. Deploy settings: leave defaults (publish directory: `/`)
5. Click **Deploy**

### 3. Enable Netlify Identity

1. In Netlify dashboard → **Site settings → Identity**
2. Click **"Enable Identity"**
3. Under **Registration**, select **"Invite only"** (so only George can log in)
4. Under **Services → Git Gateway**, click **"Enable Git Gateway"**

### 4. Invite George

1. Go to **Identity** tab in Netlify dashboard
2. Click **"Invite users"**
3. Enter George's email address
4. George gets an email, sets a password, and he's in

### 5. Set Custom Domain

1. In Netlify → **Domain settings**
2. Add `torchtastic.com` as custom domain
3. Update GoDaddy DNS:
   - Add a CNAME record: `www` → `YOUR-SITE.netlify.app`
   - Or update nameservers to Netlify's (recommended)

---

## How George Uses the CMS

1. Go to `torchtastic.com/admin`
2. Log in with email/password
3. He sees a dashboard with sections:

| Section | What George Can Edit |
|---------|---------------------|
| **Hero Section** | Headline, subtitle, badge text, logo image, CTA buttons |
| **About George** | Bio, photos, stats (books, lives impacted, countries) |
| **Spark Quotes** | Both motivational quotes and attributions |
| **Social Media Links** | Instagram, TikTok, YouTube, Facebook, LinkedIn URLs |
| **Featured Book** | Title, tagline, description, cover photo, Amazon link |
| **Booking Section** | Title, description, speaking topics list |
| **Programs & Keynotes** | Add/edit/delete programs with outcomes |
| **Media Gallery** | Upload new photos, set captions, mark as featured |
| **Testimonials** | Add client testimonials with name, title, quote |
| **Industries & Events** | Add/remove industry tags |

4. Make changes, click **"Publish"**
5. Netlify auto-deploys in ~30 seconds
6. Changes are live on the site

---

## Important Notes

- **The CMS edits JSON data files** in the `_data/` folder. The current static HTML
  doesn't dynamically read these files yet. To make the CMS fully functional,
  you'd need to either:
  - Use a static site generator (Eleventy, Hugo, Jekyll) that reads the JSON at build time
  - Or add client-side JavaScript that fetches the JSON and populates the HTML

- **For the basic $250 CMS add-on**: Set up Eleventy (simplest option) to template
  the HTML from the JSON data files. This takes 2-3 hours of dev work.

- **For the full $400 CMS**: Everything above plus blog support, testimonial pages,
  and a custom Netlify build pipeline.

- **Image uploads** go directly to the `images/` folder in the Git repo.
  Netlify rebuilds automatically when George publishes changes.

---

## File Structure

```
torchtastic/
├── admin/
│   ├── index.html          ← CMS dashboard page
│   └── config.yml          ← CMS field definitions
├── _data/
│   ├── hero.json           ← Hero section content
│   ├── about.json          ← About section content
│   ├── quotes.json         ← Spark quotes
│   ├── social.json         ← Social media URLs
│   ├── book.json           ← Featured book info
│   ├── booking.json        ← Booking section content
│   ├── industries.json     ← Industry tags
│   ├── programs/           ← Individual program files
│   ├── gallery/            ← Gallery photo entries
│   └── testimonials/       ← Testimonial entries
├── css/style.css
├── js/main.js
├── images/
└── index.html
```

---

## For Future Clients

This same CMS setup can be replicated for any landing page project:

1. Build the static site (HTML/CSS/JS)
2. Add `admin/index.html` and `admin/config.yml`
3. Create `_data/` JSON files matching the config
4. Push to GitHub, connect Netlify, enable Identity
5. Invite the client

**Charge: $250–$400 on top of the base site build.**
**Recurring: $75–$150/mo maintenance if they want you to manage it.**
