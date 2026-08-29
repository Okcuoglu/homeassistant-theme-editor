# Theme Editor Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A Lovelace custom card that lets you **design a Home Assistant theme visually**,
right inside your dashboard - color pickers, shape and animation controls, a
live device-frame preview, and one-click YAML export. No manual `themes.yaml`
fiddling to get started, no restart needed to try ideas.

## v2.0.0: workspace layout

The editor is now a three-zone workspace instead of one long scrolling
column of accordions:

- **Topbar** - theme name, Base/Light/Dark mode, Presets, Import, Reset,
  an unsaved-changes counter, a YAML toggle, and Save.
- **Section navigation** (left, fixed width) - one entry per category,
  **Advanced** (shapes/animations/backgrounds) first, then the eleven color
  and sizing groups. Exactly one section is visible at a time - no more
  hunting through open/closed accordions.
- **Live preview** (right, fixed width) - stays in view while you scroll
  the content column, so you can watch a color change land without
  scrolling back and forth. Switch between Phone / Tablet / Wall Panel
  widths, jump to a full-card gallery, or open the shape comparison from
  its footer.
- **YAML popup** (opened from the topbar) - three tabs (Variables / Card Shape
  / Background) replace three separate copy buttons that used to be
  scattered through the page.

## Features

- 🎨 **127 fixed theme variables** across 14 sections (primary colors,
  backgrounds, text, sidebar, cards & shape, typography, status colors,
  switches, checkboxes, progress bar, slider & lines, dialogs, input
  fields, label badges), plus unlimited **custom variables** for anything
  else (see below)
- 🌗 **Light/Dark mode editing** - edit shared base values once, then switch
  to Light or Dark to add mode-specific overrides, with a one-click "copy
  from other mode" starting point
- 👀 **Live preview** in a device frame (Phone 300px / Tablet 380px /
  Wall Panel 400px) that updates instantly as you edit, without touching
  your real dashboard, with a **Primary Colors strip** underneath -
  always-visible swatches for your 4 lead colors, click any one to copy
  its hex, no need to switch sections to grab a value
- 🎯 **Section-aware preview** - selecting Switches, Checkboxes, Progress
  Bar, or Input Fields in the nav swaps the live preview to a demo of
  *that* element (an actual switch, checkbox, progress bar, or
  dropdown/text field) instead of always showing the same light-card
  mockup - so you can immediately see whether a variable you just changed
  actually affects anything
- 📚 **15 built-in starter presets** across a wide range of moods - from
  clean minimalism to warm materials to retro-technical - to load as a
  jumping-off point
- 🎨 **Advanced section** - real *shape* variety, not just color:
  - **8 card shapes**: Elevated, Flat, Outlined, Glass/Holo, Angular
    (clipped corners), Chamfered (octagon corners), Pill (fully rounded),
    Neon Outline (glowing border) - shown as live tiles, click to select
  - **4 toggle/switch shapes**: Default, Rounded square, Sharp, Neon glow
    track - reflected live in the preview; the real-switch card-mod snippet
    is best-effort since exact selectors vary by HA version (clearly
    labeled in the generated YAML)
  - **5 independent, combinable animations**: Hover elevate, Glow pulse,
    Shimmer sweep, Rotating gradient border, Press flash (ripple
    approximation) - layer any combination on top of any shape
  - **Compare Shapes gallery** - see all 8 shapes side by side with your
    current colors/animations applied, click any card to copy its
    `card_mod: class: ...` snippet
- 🌌 **11 dashboard background animations** - a different card-mod
  injection point (`card-mod-view`, styling the whole view behind every
  card, not individual cards), shown as live-animated tiles right in the
  Advanced section (Phosphor Sweep, Raster Pulse, Dust in Light, Blueprint
  Grid, Circuit Trace, Interference, Reactor Ring, Crosshair, Azimuth,
  Window Light, Linen Weave). Slow, transform/opacity-driven for
  performance on weaker displays (e.g. a wall-mounted tablet), colors only
  via theme variables
- 🖼️ **Full Preview** - a snapshot popup showing 11 common Home Assistant
  card types (light, thermostat, weather, media player, history graph,
  entities list, alarm panel, camera, button card, gauge, status badges)
  all styled with your current theme
- ⌨️ **Input Fields section** - backgrounds/text/underlines for text fields,
  dropdowns, and search boxes across *all* of Home Assistant, not just
  cards (the automation editor, entity search, other integrations'
  dialogs). Covers the legacy `input-*`/`mdc-*` set, the `md-sys-color-*`
  MD3 set, and the newer `ha-color-form-background` token - these are more
  version-dependent than most other variables, see
  [YAML-GUIDE.md](YAML-GUIDE.md) if one set doesn't visibly apply
- 🔘 **Switches, Checkboxes & Progress Bar sections** - HA 2026.5 migrated
  these components to a new base (webawesome) with entirely new token
  families (`ha-switch-*`, `ha-checkbox-*`, `ha-progress-bar-*`). The old
  `switch-*` tokens are kept and labeled "(legacy)" since they may no
  longer have any effect on current Home Assistant - use the new ones
- 🧩 **Custom Variables section** - an escape hatch for anything not
  covered by the 127 built-in fields, most notably Home Assistant's
  per-entity **state colors** (`state-{domain}-{device_class}-{state}-color`,
  e.g. `state-cover-garage-open-color`) - a huge, open-ended combination
  of 27 domains × arbitrary states/device classes that can't reasonably be
  fixed fields. Includes a quick-add helper that builds the correct key
  from a domain dropdown + optional device class + state, plus a free-form
  "any variable" field for anything else
- 📥 **Import** an existing theme YAML (flat, or with a `modes:` block) to
  keep editing it
- 📋 **Export** via clipboard copy or `.yaml` file download, with a
  **"✓ Combined" tab (the default)** that automatically merges Variables,
  Card Shape, and Background into one ready-to-paste file - no manual
  stacking required, plus the three individual tabs for when you want
  just one piece on its own
- 💾 Autosaves your work-in-progress to browser `localStorage` so a refresh
  won't lose your edits, plus an explicit **Save** with an unsaved-changes
  counter for peace of mind
- 📐 Responsive down to the HA config-dialog width: full three-zone layout
  above 1280px, single-column fields with a narrower preview from
  1024-1279px, and a horizontal section tab bar with a collapsible preview
  panel below 1024px
- 🪶 Zero dependencies, plain JS, works with any Lovelace dashboard

## Installation

### HACS (recommended)

1. Go to **HACS → Frontend**
2. Click the three-dot menu → **Custom repositories**
3. Add `https://github.com/Okcuoglu/homeassistant-theme-editor`
   as category **Dashboard**
4. Find **Theme Editor Card** in the list and install it
5. Add the resource if HACS didn't do it automatically (see below)

### Manual

1. Download `theme-editor-card.js` from the
   [latest release](https://github.com/Okcuoglu/homeassistant-theme-editor/releases)
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

1. Give your theme a name in the topbar
2. Pick a section from the left nav and adjust values - the preview updates
   live on the right
3. Open the **YAML** popup (topbar button) and pick the Variables / Card
   Shape / Background tab you need, then **Copy** or **Load .yaml**
4. Paste/save the result into `/config/themes/<your_theme>.yaml`
5. Make sure your `configuration.yaml` includes:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
6. Restart Home Assistant, then select your theme under
   **Profile → Theme**

> **Tip:** the mode segmented control in the topbar (Base / Light / Dark)
> holds mode-independent values under "Base". Switch to "Light" or "Dark"
> to add overrides just for that mode - only fields you actually touch
> there are written to the `modes:` block, everything else keeps
> inheriting the base value.

> **Full walkthrough:** see [YAML-GUIDE.md](YAML-GUIDE.md) for how to
> combine all three YAML popup tabs into one theme file, per-card and
> per-view overrides, and troubleshooting.

## Why no direct "save to server"?

Browser-side Lovelace cards have no filesystem access to your Home Assistant
config - that's a deliberate security boundary in HA's frontend. The
in-card **Save** button writes your work-in-progress to browser storage so
it survives a refresh; getting the finished YAML onto disk still takes one
manual copy-paste (or file download + move), the same as installing any
hand-written theme.

## Contributing

Bug reports, feature requests and PRs are welcome - see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)