# Retire this preview

This is a **temporary** public design-review preview. When Manjula's review is
done (or the site moves to Wix), remove it. Steps for Amit:

## 1. Disable GitHub Pages
- GitHub → `qkumami/achrh-homepage-review` → **Settings → Pages**.
- Under **Build and deployment → Source**, set to **None** (or **Deploy from a
  branch → None**) and save. *Or* via CLI:
  `gh api -X DELETE repos/qkumami/achrh-homepage-review/pages`

## 2. Confirm the URL no longer serves
- Open `https://qkumami.github.io/achrh-homepage-review/` in a **new Incognito**
  window — expect a 404 / not-found (allow a few minutes for propagation).

## 3. Make the repo private, or delete it
- **Private:** Settings → General → Danger Zone → **Change visibility → Private**.
- **Delete:** Settings → General → Danger Zone → **Delete this repository**.
  *Or* via CLI: `gh repo delete qkumami/achrh-homepage-review --yes`
  (deletion needs the `delete_repo` scope; a browser delete is simplest).

## 4. Retain a local copy if wanted
- The local repository at `/Users/amitkumar/achrh-homepage-review` and the source
  at `/Users/amitkumar/achrh-website-preview/` remain on your machine regardless.

## 5. Do NOT affect anything else
Retiring this preview must not touch **ACHRH Wix**, the **live WordPress site**,
**achrh.org / DNS**, **HostGator**, **AWS**, or **CARE** — none of them are
connected to this preview. Only `qkumami/achrh-homepage-review` is removed.
