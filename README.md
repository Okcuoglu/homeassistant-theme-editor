# Theme Editor Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Lovelace custom card that lets you **design a Home Assistant theme visually**,
right inside your dashboard - color pickers, layout controls, a live mockup
preview, and one-click YAML export. No manual `themes.yaml` fiddling to get
started, no restart needed to try ideas.

## Features

- 🎨 **~46 theme variables** grouped into collapsible categories (primary
  colors, backgrounds, text, sidebar, cards & shape, typography, status
  colors, switches, sliders, dividers, dialogs, label badges)
- 👀 **Live mockup preview** - a self-contained sample dashboard (sidebar,
  cards, toggle, slider, badges) that updates instantly as you edit, without
  touching your real dashboard
- 📥 **Import** an existing flat theme YAML to keep editing it
- 📋 **Export** via clipboard copy or `.yaml` file download
- 💾 Autosaves your work-in-progress to browser `localStorage` so a refresh
  won't lose your edits
- 🪶 Zero dependencies, plain JS, works with any Lovelace dashboard

## Installation

### HACS (recommended)

1. Go to **HACS → Frontend**
2. Click the three-dot menu → **Custom repositories**
3. Add `https://github.com/<your-github-username>/homeassistant-theme-editor`
   as category **Dashboard**
4. Find **Theme Editor Card** in the list and install it
5. Add the resource if HACS didn't do it automatically (see below)

### Manual

1. Download `theme-editor-card.js` from the
   [latest release](https://github.com/<your-github-username>/homeassistant-theme-editor/releases)
2. Copy it into `/config/www/theme-editor-card.js`
3. Go to **Settings → Dashboards → Resources → Add Resource**
   - URL: `/local/theme-editor-card.js`
   - Resource type: `JavaScript Module`
4. Refresh your browser

## Usage

Add the card to any dashboard:

```yaml
type: custom:theme-editor-card
```

Or via the UI: **Edit Dashboard → Add Card → search "Theme Editor Card"**.

1. Give your theme a name at the top
2. Open a category and adjust colors / values - the preview updates live
3. When you're happy, hit **Copy YAML** or **Download .yaml**
4. Paste/save the result into `/config/themes/<your_theme>.yaml`
5. Make sure your `configuration.yaml` includes:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
6. Restart Home Assistant, then select your theme under
   **Profile → Theme**

> **Note:** this card only edits *flat* themes (a single variable set, no
> separate `modes: light/dark` block) in v1. Light/dark mode support is
> tracked as a future enhancement - see [Contributing](CONTRIBUTING.md).

## Why no direct "save to server"?

Browser-side Lovelace cards have no filesystem access to your Home Assistant
config - that's a deliberate security boundary in HA's frontend. This card
gives you the fastest path to a finished, correct theme file; getting it onto
disk still takes one manual copy-paste (or file download + move), the same as
installing any hand-written theme.

## Contributing

Bug reports, feature requests and PRs are welcome - see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
