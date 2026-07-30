# Archive — the Dragon's Trove Press site as it stood before the 2026 redesign

This folder preserves the previous dragonstrovepress.com so it can be brought back
at any time. Nothing here is served to visitors; it is a safety copy only.

## What was archived

| | |
|---|---|
| Archived on | 30 July 2026 |
| Last live commit | `5faa53aebc4d0f8fa8ed6c14a0a05a8ea434fe42` (`5faa53a`) |
| Commit subject | "Updated final cover" |
| Committed by | Jeffrey Hallett, 3 July 2026 |
| Archive file | `dragonstrove-site-pre-2026.zip` (17 MB, 26 files) |

## What is in the zip

The complete working site — every file the old site actually served, in its original
folder layout:

```
index.html, styles.css, main.js, README.md, .gitattributes
assets/favicon/          all 9 icon and manifest files
assets/images/           the 8 images the site referenced
assets/images/updatedCovered2025/   the 3 book covers
```

Unzip it into any empty folder and open `index.html` — the old site runs exactly as
it did, offline, with no build step or server required.

## What is deliberately not in the zip

Three large image files that existed in the repository but which no page ever
referenced — leftover variants of the parchment background, about 28 MB between them:

```
assets/images/mbp16_parchment_1.jpg
assets/images/mbp16_parchment_2.jpg
assets/images/mbp16_parchment_2_overlay.jpg
```

They were left out to keep this archive to a sensible size. They are **not lost** —
they remain in the repository's history and are recoverable through either of the
first two restore routes below. (The one parchment file the site did use,
`mbp16_parchment_1_overlay.jpg`, *is* in the zip.)

A handful of other unused images from the old repository — earlier cover mock-ups,
placeholder art, the author shot and a Barnes & Noble icon — were likewise not
referenced by any page and are recoverable the same way.

## How to restore the old site

Three routes, fastest first.

### 1. Republish the previous deploy (fastest, no code involved)

The site is hosted on Netlify, which keeps every previous deploy. In the Netlify
dashboard open **Deploys**, find the last deploy from before the 2026 redesign, and
choose **Publish deploy**. The old site is live again within seconds. Nothing in
GitHub changes, so this is also the easiest thing to undo.

### 2. Recover the files from Git

The exact state of the repository before the redesign is permanently tagged:

```bash
git fetch --tags
git checkout pre-2026-site      # look around at the old files
```

This gives you everything, including the three large images left out of the zip. To
put the whole site back on `main` as a new commit that undoes the redesign:

```bash
git checkout main
git revert --no-commit <merge-commit-of-the-redesign>
git commit -m "Restore the pre-2026 site"
git push
```

Netlify will pick that up and rebuild automatically.

### 3. Unzip this archive

Unzip `dragonstrove-site-pre-2026.zip` and copy its contents over the top of the
repository root, replacing what is there. Commit and push. Use this if you want the
old files back without going through Git history.

## Worth knowing

- The old site and the new one share a few files — the logo, the Bookshop and
  IngramSpark icons, the dragon-scale texture, and the whole `assets/favicon/`
  folder. Those were kept in place during the changeover, so they appear both in
  this archive and in the live site.
- The site has always been plain HTML, CSS and JavaScript with no build step, and
  the redesign did not change that. Restoring is only ever a matter of putting the
  files back.
