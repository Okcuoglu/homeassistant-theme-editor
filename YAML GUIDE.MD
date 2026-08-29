# Working With the Generated YAML

**Fastest path: open the YAML popup (topbar → YAML) and use the
"✓ Combined" tab (it's the default).** It automatically merges Variables,
Card Shape, and Background into one ready-to-paste file - no manual
stacking needed. Save its contents directly as
`/config/themes/<your_theme>.yaml` and skip to
[Installing a theme](#installing-a-theme).

The rest of this guide explains what "Combined" is doing under the hood,
and covers the individual tabs for when you want just one piece (e.g.
pasting only the Background block into a single view's own config).

The YAML popup has three tabs - **Variables**, **Card Shape**, and
**Background**. They're separate tabs because they're separate concerns
(and, for Card Shape/Background, a separate card-mod feature), but they all
belong in **one theme file** in the end. This guide walks through combining
them correctly, installing them, and the most common things that trip
people up.

## Custom Variables and entity state colors

Beyond the 73 built-in fields, Home Assistant supports styling individual
entities by domain/device-class/state - most commonly used to give
different colors to, say, an open garage door vs. a closed one, or a
heating thermostat vs. an idle one. The pattern (from [Home Assistant's
own docs](https://www.home-assistant.io/integrations/frontend/#state-color)):

```
state-{domain}-{device_class}-{state}-color
state-{domain}-{state}-color
state-{domain}-(active|inactive)-color
state-(active|inactive)-color
```

More specific rules win over less specific ones. Supported domains:
`alarm_control_panel`, `alert`, `automation`, `binary_sensor`, `calendar`,
`camera`, `climate`, `cover`, `device_tracker`, `fan`, `group`,
`humidifier`, `input_boolean`, `light`, `lock`, `media_player`, `person`,
`plant`, `remote`, `schedule`, `script`, `siren`, `sun`, `switch`,
`timer`, `update`, `vacuum`.

Since this is a huge, open-ended combination space, it isn't practical as
fixed fields - use the **Custom Variables** section's quick-add helper
instead: pick a domain, optionally a device class, type the state, pick a
color. It builds the key for you and adds it straight to your theme's
Variables export, same as any other field.

The same section's free-form "Add any variable" field works for anything
else not covered by this card's built-in fields - Home Assistant's own
docs note that some theme variables can change behavior between releases
([see color.globals.ts](https://github.com/home-assistant/frontend/blob/master/src/resources/theme/color/color.globals.ts)
for the current authoritative list), so this is also your escape hatch if
a future HA version adds something new before this card catches up.

## What each tab actually is

| Tab | What it contains | Requires card-mod? |
|---|---|---|
| **✓ Combined** | All three below, already merged into one file | Only if Card Shape/Background actually need it - harmless either way |
| **Variables** | Your color/spacing values as a flat (or `modes:`-nested) block under your theme name | No - plain HA theming |
| **Card Shape** | `card-mod-theme:` + `card-mod-card:` keys - the global card look plus opt-in per-card shape classes | Yes |
| **Background** | `card-mod-view:` key - an animated dashboard background, a different injection point from Card Shape | Yes |

Using **Combined**, you never need to touch the other three tabs at all -
they exist for when you want just one piece on its own (e.g. pasting only
the Background block into a single view's own config, as described
further down).

## Combining all three into one file

All three tabs are keys under the **same top-level theme name**. Copy each
tab's content and stack the keys - don't create three separate files.

Given a theme named `my_theme`, the merged result looks like this:

```yaml
my_theme:
  # --- from the Variables tab ---
  primary-color: "#7fb2e5"
  accent-color: "#e8e3d3"
  primary-background-color: "#0f1c2e"
  card-background-color: "#182b41"
  primary-text-color: "#e6ecf4"
  # ...every other value you set...

  # --- from the Card Shape tab ---
  card-mod-theme: "my_theme"
  card-mod-card: |
    ha-card {
      transition: transform 200ms ease, box-shadow 200ms ease;
      border-radius: 3px;
      border: 1px solid var(--ha-card-border-color);
    }
    ha-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.4);
    }
    /* ...shape classes (ha-card.pill, ha-card.outlined, etc.)... */

  # --- from the Background tab (only if you picked one) ---
  card-mod-view: |
    @keyframes theme-editor-bg-azimut { /* ... */ }
    .theme-editor-bg-azimut::before { /* ... */ }
```

A few things worth knowing about this merge:

- **Indentation matters.** Every key (`primary-color`, `card-mod-theme`,
  `card-mod-view`, ...) sits at the same 2-space indent directly under
  `my_theme:`. The multi-line `card-mod-card: |` and `card-mod-view: |`
  blocks use the `|` (literal block) YAML syntax - keep their contents
  indented one level deeper than the key itself, exactly as the popup
  generates them.
- **`card-mod-theme: "my_theme"` must match your actual theme name.** If
  you rename the theme after copying the Card Shape tab, update this line
  too - it's how card-mod knows which theme this styling belongs to.
- **Order doesn't matter** between the three blocks - YAML keys aren't
  positional - but keeping Variables → Card Shape → Background in that
  order (matching the tabs) makes the file easier to scan later.
- **Skip the Background block entirely** if you left it on "None" - the
  tab shows a placeholder comment in that case, not real YAML, so there's
  nothing to copy.

## Installing a theme

1. **If you used the Card Shape or Background tab**, install
   [card-mod](https://github.com/thomasloven/lovelace-card-mod) via HACS
   first (Frontend category). Variables alone don't need it.
2. Save the merged YAML as `/config/themes/my_theme.yaml` (use the File
   Editor add-on, VS Code add-on, or Samba/SSH - whatever you normally use
   to edit HA config files).
3. Make sure `configuration.yaml` includes:
   ```yaml
   frontend:
     themes: !include_dir_merge_named themes
   ```
   (If you've installed any hand-written theme before, this is probably
   already there.)
4. **Restart Home Assistant** (Settings → System → Restart). Themes are
   only picked up at startup, unlike most other config changes.
5. Go to your profile (click your avatar, bottom-left) → **Theme** →
   select `my_theme`.
6. Hard-refresh the browser (`Ctrl+Shift+R` / `Cmd+Shift+R`) if it doesn't
   look right immediately - browsers cache frontend assets aggressively.

## Using per-card and per-view overrides

The Card Shape and Background tabs both generate a **global default**
plus **opt-in overrides** for individual cards or views - you don't have
to use the same shape/background everywhere.

**A single card with a different shape** than your global default:
```yaml
type: entities
entities: [...]
card_mod:
  class: pill
```
Valid class names are listed in the comment inside the generated Card
Shape YAML (`elevated`, `flat`, `outlined`, `glass-holo`, `angular`,
`chamfered`, `pill`, `neon-outline`).

**A single view with the animated background**, without changing the
theme file at all - open that view's raw config (three-dot menu → Edit →
raw configuration editor) and add:
```yaml
card_mod:
  style: |
    <paste the CSS from inside "card-mod-view: |", with every
     .theme-editor-bg-<name> replaced by :host>
```

**The animated background on more than one view via the theme file**
(instead of per-view style): paste the whole `card-mod-view:` block into
your theme as shown above, then on each view you want it on:
```yaml
card_mod:
  class: theme-editor-bg-azimut
```
(swap `azimut` for whichever background id you picked - it's in the
class names inside the generated YAML).

## Component migration to webawesome (HA 2026.5+)

**Home Assistant migrated `ha-switch`, `ha-checkbox`, and `ha-textarea` to
a new base component library (webawesome) in the 2026.5 release.** This
removed the old MDC-based styling tokens for switches:
`switch-checked-color`, `switch-unchecked-color`,
`switch-checked-button-color`, `switch-checked-track-color`,
`switch-unchecked-button-color`, `switch-unchecked-track-color`. If
you're on HA 2026.5 or later, these six fields (kept in the Switches
section, labeled "legacy") likely have no visible effect anymore - use
the `ha-switch-*` fields instead. Checkboxes work the same way: old MDC
checkbox tokens no longer apply, use the `ha-checkbox-*` fields.
`ha-progress-bar` is an entirely new, fully-themeable component
(previously `mwc-progress-bar` wasn't stylable at all) - the
`ha-progress-bar-*` fields are new capability, not a replacement.

If you're on an older HA version (pre-2026.5), the legacy switch fields
are what actually works, and the new `ha-switch-*` fields will simply
have no effect until you update.

## Troubleshooting

**Input field colors (search boxes, dropdowns, form fields) only partially apply.**
Home Assistant migrated parts of its input styling to Material Design 3
in the 2026.4 release, which introduced a new `md-sys-color-*` variable
set alongside the older `input-*`/`mdc-*` one - which set actually takes
effect depends on your HA version and which specific component you're
looking at. The Input Fields section includes both sets for this reason;
if changing one set doesn't visibly do anything, try the other. This is
an area Home Assistant itself has changed more than once, so don't be
surprised if it needs revisiting after a future HA update.

**Native Home Assistant dialogs (like HACS's own download screen) look
slightly off - dropdowns, fonts, spacing.**
This isn't a card bug. The `paper-font-*` variables in the Typography
section are **global HA theme variables** - they affect the entire Home
Assistant frontend, not just cards, since Home Assistant itself uses them.
Native Material components (like the `mwc-select` dropdown in HACS's
dialogs) aren't guaranteed to gracefully handle every font-size
combination, so occasional visual mismatches in rarely-seen native
screens are an inherent trade-off of any custom HA theme, not specific to
this card. Staying close to HA's defaults (Body 14px, Subhead 16px,
Headline 24px, Title 21px, Caption 12px) minimizes it; switching back to
"Default" under Profile → Theme while doing admin tasks like HACS updates
avoids it entirely.

**Nothing changed after selecting the theme.**
Confirm you restarted HA (step 4 above) - a reload isn't enough for theme
files. Then hard-refresh the browser.

**Colors work but shapes/animations don't.**
Card-mod isn't installed, or `card-mod-theme:` doesn't match your actual
theme name exactly (case-sensitive).

**The toggle/switch shape snippet has no visible effect.**
This one's labeled "best effort" in the generated YAML on purpose - the
exact element and shadow-DOM structure for switches varies across Home
Assistant frontend versions. Open your browser DevTools (F12), inspect an
actual toggle, and adjust the selector in the snippet to match what you
find.

**Light/Dark mode values aren't showing up.**
Only fields you explicitly touch while the Light or Dark tab is active
get written into the theme's `modes:` block - anything you haven't
touched there keeps inheriting the Base value on purpose, so an "empty"
Light or Dark tab is expected, not a bug.

**You edited the card's own JS/HACS install, not your dashboard.**
Everything above is about the **exported theme file**, separate from the
Theme Editor Card itself. Editing values in the card and exporting YAML
never touches your real dashboard until you copy that YAML into
`/config/themes/` yourself - see [Why no direct "save to
server"?](README.md#why-no-direct-save-to-server) in the README for why.