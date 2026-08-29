## Theme Editor Card

Design a Home Assistant theme visually, right inside your dashboard.

- ~46 grouped, collapsible theme variables
- Live mockup preview (sidebar, cards, toggle, slider, badges)
- Import an existing flat theme to keep editing it
- Export via clipboard or `.yaml` download
- Autosaves to `localStorage`, zero dependencies

{% if not installed %}
### Installation

1. Click install
2. Add the resource under **Settings → Dashboards → Resources** if not added
   automatically:
   - URL: `/hacsfiles/homeassistant-theme-editor/theme-editor-card.js`
   - Type: JavaScript Module
3. Add `type: custom:theme-editor-card` to any dashboard
{% endif %}
