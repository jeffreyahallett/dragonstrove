# Dragon's Trove Press

The website for Dragon's Trove Press — [dragonstrovepress.com](https://dragonstrovepress.com)

Plain HTML, CSS and JavaScript. No framework, no build step, nothing to install.

## The files

| File | What it holds |
|---|---|
| `index.html` | Every word and picture on the page |
| `styles.css` | Colours, fonts, spacing |
| `main.js` | The interactive bits — trailer, art viewer, menu |
| `assets/` | Images, favicons, press PDFs |
| `archive/` | A copy of the previous site, kept for safekeeping |

## Editing the site

Nearly everything you'll want to change lives in `index.html`, and it explains
itself. Open it and read the block of notes at the very top — it covers how the
page is laid out, where each section lives, and the handful of rules worth
knowing. Throughout the file you'll find notes marked:

- **✎ EDIT** — safe to change; this is your content
- **▣ TEMPLATE** — a ready-made block to copy when adding a new award, quote or press mention
- **⚠ CAUTION** — change with care, and what will break if you don't

## Publishing a change

Edit the file here on GitHub (the pencil icon at the top right of the file view),
then **Commit changes**. Netlify rebuilds the site automatically and the change is
live in a minute or two. There is nothing else to press.

Every previous version is kept, so any change can be undone.

## Viewing the site on your own machine

Not required, but if you want to preview before publishing:

```bash
python3 -m http.server 5173
```

Then open <http://127.0.0.1:5173> in a browser.

## Restoring the previous site

See [`archive/README.md`](archive/README.md), which records what was archived and
three ways to put the old site back.
