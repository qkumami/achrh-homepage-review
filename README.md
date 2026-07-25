# ACHRH Homepage — Design Preview (temporary)

A **temporary design-review preview** of a proposed new homepage for the
**AustralAsian Centre for Human Rights & Health (ACHRH)**.

## Please note
- This is an **early design preview**, not the final website.
- The **final ACHRH website will be implemented in ACHRH's existing Wix
  account.**
- The **live ACHRH website (achrh.org) has not been changed** by this preview.
- **Forms and donation controls are non-operational** placeholders — nothing is
  submitted or processed.
- Some links are placeholders while the remaining pages are being developed.
- This preview is intended to be **removed after stakeholder approval**.
- It contains **no CARE and no AWS integration**, and no backend.

## What this is technically
A single static HTML page with local images and CSS/JavaScript — no server, no
APIs, no external requests, no tracking, no credentials. Served via GitHub Pages
purely for convenient stakeholder review. Search indexing is disabled
(`noindex, nofollow` + `robots.txt`).

## Files
```
index.html            the homepage
assets/achrh-logo.png the ACHRH logo
assets/hero-family.jpg the hero image (design placeholder)
robots.txt            disallow indexing
.nojekyll             serve files as-is on GitHub Pages
```

Retirement instructions: see `RETIRE-PREVIEW.md`.
