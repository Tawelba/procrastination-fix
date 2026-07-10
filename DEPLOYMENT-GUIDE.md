# Deployment Guide: Procrastination Fix Landing Page

## Overview

This guide walks you through deploying your landing page to Cloudflare Sites for free hosting.

---

## Prerequisites

- Cloudflare account (free)
- Domain registered at Cloudflare: procrastination-fix.com
- Confirmation email saved
- Ability to open browser (Chrome, Firefox, Safari, etc.)

---

## Step 1: Login to Cloudflare

1. Go to: https://dash.cloudflare.com
2. Sign in with your email or Google/GitHub account
3. You should see your dashboard

---

## Step 2: Access Cloudflare Sites

1. Look at the left sidebar
2. Click "Sites" (under "Zero Trust" or "Applications" section)
3. You should see an empty "Sites" dashboard with a "Create site" or "Add site" button

---

## Step 3: Add Your Domain

1. Click "Create site" or "Add site"
2. Enter your domain: **procrastination-fix.com**
3. Click "Add site" or "Continue"

---

## Step 4: Upload Your Landing Page

There are two ways to upload your landing page:

### Method A: Direct Upload (Recommended for Beginners)

1. After adding your site, you should see "Files" or "Deploy" section
2. Look for "Add files" or "Upload files" button
3. Go to your file system and find:
   - `index.html` (in `/home/node/.openclaw/workspace/procrastination-fix/`)
   - You can upload it from your computer or drag it in
4. The site should automatically publish once uploaded

### Method B: Using Cloudflare Dashboard (Alternative)

1. In the Sites dashboard, click "Show manual deploy instructions"
2. You'll see Git or direct upload options
3. Choose "Direct upload" if available
4. Upload your `index.html` file

---

## Step 5: Verify Deployment

1. Wait 30 seconds – 2 minutes after uploading
2. Check your site URL:
   - **https://procrastination-fix.com** (or whatever your subdomain is)
3. Make sure:
   - The page loads correctly
   - All sections (hero, problem, solution, CTA) are visible
   - Links work (emails should show as formatted)

---

## Step 6: Test Your Affiliate Links

Open your site in a new browser or incognito window:

1. Click "Start Free Trial →" button
2. It should redirect you to https://www.focusmate.com
3. Check that you're on Focusmate's affiliate landing page

---

## Step 7: Add Your Affiliate Links (Once Approved)

Once you get your affiliate links from Focusmate, ClickUp, and Todoist:

1. Open your `index.html` file
2. Find the section starting with: `<!-- CTA Section -->`
3. Update the "Start Free Trial" link:

```html
<a href="https://www.focusmate.com" target="_blank" class="cta-button cta-button-primary">
    Start Free Trial at Focusmate
</a>
```

4. Change it to your affiliate link, for example:

```html
<a href="https://www.focusmate.com?aff=YOUR_AFFILIATE_ID" target="_blank" class="cta-button cta-button-primary">
    Start Free Trial at Focusmate
</a>
```

5. Save the file
6. Re-upload it to Cloudflare Sites (or wait for auto-publish if configured)

---

## Step 8: Set Up Email Capture for PDF Guide

### Option A: Google Forms (Free, Simple)

1. Go to https://forms.google.com
2. Click "Blank form"
3. Add the following fields:
   - Field 1: Email (type: Short answer, required: Yes)
   - Field 2: Name (optional, type: Short answer)
4. Click "Send"
5. Copy the Google Forms URL and paste it in your `index.html`:
   ```html
   <a href="https://forms.google.com/your-form-url" class="cta-button cta-button-secondary">
       Get My Free Procrastination PDF Guide
   </a>
   ```
6. Re-upload `index.html` to Cloudflare

### Option B: Mailchimp (Free Plan Available)

1. Go to https://mailchimp.com
2. Sign up for free plan
3. Create an email capture form in Mailchimp
4. Get your signup link
5. Replace the link in `index.html` with your Mailchimp signup link
6. Re-upload to Cloudflare

---

## Step 9: Set Up PDF Delivery

Once users fill out your form:

### For Google Forms:
- Google Forms doesn't send attachments automatically
- Optional: Set up a simple email forwarder or use a form-to-email service

### For Mailchimp:
- Create a free PDF in your landing page HTML
- Upload it to Mailchimp "Campaigns" or "Landing Pages"
- Email users automatically using Mailchimp automation

### Recommended (Simplest):
- Create a simple "Download" link in your form redirect
- Example: After they submit, show a message with a direct download link to `pdf-guide.pdf`
- Host the PDF file on Cloudflare Sites as `/download/pdf-guide.pdf`

---

## Step 10: Add Compliance Pages

Add these links in the footer of your `index.html`:

```html
<div class="footer-links">
    <a href="#">Privacy Policy</a>
    <a href="#">Terms of Service</a>
    <a href="#">Contact</a>
</div>
```

### Quick Privacy Policy Template (Copy-Paste):

Create `privacy-policy.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Procrastination Fix</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
        h1 { color: #333; }
        p { color: #666; line-height: 1.6; }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p>Last updated: 2026</p>
    <p>We collect email addresses only to send your requested PDF guide. We do not sell your data.</p>
    <p>Contact: stawelba@gmail.com</p>
</body>
</html>
```

Upload `privacy-policy.html` to Cloudflare Sites alongside `index.html`.

---

## Troubleshooting

**Issue: Site doesn't load after uploading**

**Solution:**
- Wait 2–3 minutes for Cloudflare to propagate
- Clear your browser cache and reload
- Check if the domain is actually pointing to Cloudflare (check domain DNS settings)

**Issue: Links don't redirect**

**Solution:**
- Make sure you used `https://` in your links
- Check that the URL is correct
- Try opening the link in an incognito window to rule out cache issues

**Issue: PDF download doesn't work**

**Solution:**
- Make sure the PDF file is uploaded to the same Cloudflare site
- Check the exact file path in the download link
- Test the link in an incognito window

---

## Testing Checklist

Before going live, verify:

- [ ] Landing page loads at https://procrastination-fix.com
- [ ] Hero section shows correctly
- [ ] Problem section text is visible
- [ ] 3-step solution cards are displayed
- [ ] CTA buttons work
- [ ] "Start Free Trial" redirects to Focusmate
- [ ] "Get PDF" link shows email form (or redirects to your form)
- [ ] Footer links work (Privacy Policy, Terms, Contact)
- [ ] Page is mobile-responsive (test on your phone)
- [ ] No broken images or missing sections

---

## Next Steps After Deployment

Once your site is live:

1. **Share your link** on social media, TikTok, Instagram, etc.
2. **Create faceless videos** using the script I provided
3. **Drive traffic** to your landing page
4. **Track conversions** (clicks, signups, sales)
5. **Optimize** headlines, CTAs, and design based on data

---

## Performance Optimization (Optional)

Cloudflare automatically optimizes your site. For even faster performance:

1. Compress images (if you add any)
2. Minimize HTML/CSS (optional, but good practice)
3. Use a CDN for static assets (Cloudflare handles this automatically)

---

Need help? Check Cloudflare's official documentation: https://developers.cloudflare.com/sites/

---

*Congratulations! Your landing page is now live.*