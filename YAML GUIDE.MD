# Working With the Generated YAML

The YAML drawer has three tabs - **Variables**, **Card Shape**, and
**Background**. They're separate tabs because they're separate concerns
(and, for Card Shape/Background, a separate card-mod feature), but they all
belong in **one theme file** in the end. This guide walks through combining
them correctly, installing them, and the most common things that trip
people up.

## What each tab actually is

| Tab | What it contains | Requires card-mod? |
|---|---|---|
| **Variables** | Your color/spacing values as a flat (or `modes:`-nested) block under your theme name | No - plain HA theming |
| **Card Shape** | `card-mod-theme:` + `card-mod-card:` keys - the global card look plus opt-in per-card shape classes | Yes |
| **Background** | `card-mod-view:` key - an animated dashboard background, a different injection point from Card Shape | Yes |

If you never touched the Advanced section, you only need the **Variables**
tab - skip straight to [Installing a theme](#installing-a-theme).

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
  indented one level deeper than the key itself, exactly as the drawer
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

## Troubleshooting

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