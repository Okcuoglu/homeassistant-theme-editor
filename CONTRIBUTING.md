# Contributing to Theme Editor Card

Thanks for considering a contribution! This is a small, single-file custom
card, so the barrier to contributing should be low.

## Reporting bugs

Please use the **Bug report** issue template and include:

- Home Assistant version
- Browser + OS
- Steps to reproduce
- Console errors, if any (F12 → Console)

## Suggesting features

Use the **Feature request** issue template. Good candidates:

- Light/dark (`modes:`) editing support
- Additional theme variables not yet covered
- Preset/starter palettes
- Undo/redo

## Development

The card is plain JavaScript with **no build step and no dependencies** -
this is intentional, to keep installation and review simple. If you're
proposing a change that needs a build pipeline, please open an issue first
to discuss.

1. Fork the repo
2. Edit `theme-editor-card.js`
3. Test by adding it as a Lovelace resource on a dev HA instance
   (`/config/www/theme-editor-card.js` → resource → `/local/theme-editor-card.js`)
4. Open a PR against `main` describing what changed and why

## Style

- Keep it dependency-free
- Keep the shadow DOM styles scoped - never leak styles onto the real
  dashboard (the live preview is intentionally sandboxed, see README)
- Match the existing code style (plain functions, small class, no framework)

## Releasing (maintainers)

Push a tag matching `v*.*.*` (e.g. `v1.1.0`) - the release workflow builds
and publishes a GitHub Release automatically, which HACS picks up.
