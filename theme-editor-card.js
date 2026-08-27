/**
 * Theme Editor Card
 * A full-featured Home Assistant theme editor Lovelace card.
 * Live mockup preview, import/export, category groups, localStorage autosave.
 *
 * https://github.com/<your-github-username>/homeassistant-theme-editor
 * License: MIT
 */

const STORAGE_KEY = "theme-editor-card-state-v1";
const CARD_VERSION = "1.1.0";

/* ---------------------------------------------------------------------- */
/* Variable schema                                                        */
/* ---------------------------------------------------------------------- */

const FIELD_GROUPS = [
  {
    id: "primary",
    label: "Primary Colors",
    fields: [
      { key: "primary-color", label: "Primary color", type: "color", default: "#03a9f4" },
      { key: "accent-color", label: "Accent color", type: "color", default: "#ff9800" },
      { key: "dark-primary-color", label: "Dark primary color", type: "color", default: "#0288d1" },
      { key: "light-primary-color", label: "Light primary color", type: "color", default: "#b3e5fc" },
    ],
  },
  {
    id: "backgrounds",
    label: "Backgrounds",
    fields: [
      { key: "primary-background-color", label: "Primary background", type: "color", default: "#111111" },
      { key: "secondary-background-color", label: "Secondary background", type: "color", default: "#1c1c1c" },
      { key: "card-background-color", label: "Card background", type: "color", default: "#1e1e1e" },
      { key: "app-header-background-color", label: "Header background", type: "color", default: "#0b0b0b" },
      { key: "app-header-text-color", label: "Header text", type: "color", default: "#ffffff" },
    ],
  },
  {
    id: "text",
    label: "Text",
    fields: [
      { key: "primary-text-color", label: "Primary text", type: "color", default: "#ffffff" },
      { key: "secondary-text-color", label: "Secondary text", type: "color", default: "#a3a3a3" },
      { key: "text-primary-color", label: "Text on primary", type: "color", default: "#ffffff" },
      { key: "disabled-text-color", label: "Disabled text", type: "color", default: "#5c5c5c" },
      { key: "label-badge-text-color", label: "Label badge text", type: "color", default: "#111111" },
    ],
  },
  {
    id: "sidebar",
    label: "Sidebar",
    fields: [
      { key: "sidebar-icon-color", label: "Icon color", type: "color", default: "#a3a3a3" },
      { key: "sidebar-text-color", label: "Text color", type: "color", default: "#ffffff" },
      { key: "sidebar-background-color", label: "Background", type: "color", default: "#0b0b0b" },
      { key: "sidebar-selected-icon-color", label: "Selected icon", type: "color", default: "#03a9f4" },
      { key: "sidebar-selected-text-color", label: "Selected text", type: "color", default: "#03a9f4" },
      { key: "sidebar-border-color", label: "Border", type: "color", default: "#262626" },
    ],
  },
  {
    id: "cards",
    label: "Cards & Shape",
    fields: [
      { key: "ha-card-border-radius", label: "Card border radius", type: "text", unit: "px", default: "12px" },
      { key: "ha-card-border-width", label: "Card border width", type: "text", unit: "px", default: "1px" },
      { key: "ha-card-border-color", label: "Card border color", type: "color", default: "#292929" },
      { key: "ha-card-box-shadow", label: "Card box shadow", type: "text", default: "none" },
      { key: "ha-card-background", label: "Card background", type: "color", default: "#1e1e1e" },
      { key: "mdc-shape-small", label: "Shape small", type: "text", unit: "px", default: "4px" },
      { key: "mdc-shape-medium", label: "Shape medium", type: "text", unit: "px", default: "4px" },
      { key: "mdc-shape-large", label: "Shape large", type: "text", unit: "px", default: "4px" },
      { key: "grid-gap", label: "Grid gap (section spacing)", type: "text", unit: "px", default: "32px" },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    fields: [
      { key: "paper-font-body1_-_font-size", label: "Body font size", type: "text", unit: "px", default: "14px" },
      { key: "paper-font-subhead_-_font-size", label: "Subhead font size", type: "text", unit: "px", default: "16px" },
      { key: "paper-font-headline_-_font-size", label: "Headline font size", type: "text", unit: "px", default: "24px" },
      { key: "paper-font-title_-_font-size", label: "Title font size", type: "text", unit: "px", default: "20px" },
      { key: "paper-font-caption_-_font-size", label: "Caption font size", type: "text", unit: "px", default: "12px" },
    ],
  },
  {
    id: "status",
    label: "Status Colors",
    fields: [
      { key: "state-icon-color", label: "State icon", type: "color", default: "#a3a3a3" },
      { key: "state-icon-active-color", label: "State icon active", type: "color", default: "#03a9f4" },
      { key: "state-active-color", label: "State active", type: "color", default: "#03a9f4" },
      { key: "state-inactive-color", label: "State inactive", type: "color", default: "#5c5c5c" },
      { key: "error-color", label: "Error", type: "color", default: "#db4437" },
      { key: "warning-color", label: "Warning", type: "color", default: "#ffa600" },
      { key: "success-color", label: "Success", type: "color", default: "#43a047" },
    ],
  },
  {
    id: "switches",
    label: "Switches & Toggles",
    fields: [
      { key: "switch-checked-color", label: "Checked", type: "color", default: "#03a9f4" },
      { key: "switch-unchecked-color", label: "Unchecked", type: "color", default: "#5c5c5c" },
      { key: "switch-checked-button-color", label: "Checked button", type: "color", default: "#03a9f4" },
      { key: "switch-checked-track-color", label: "Checked track", type: "color", default: "#0288d1" },
      { key: "switch-unchecked-button-color", label: "Unchecked button", type: "color", default: "#bdbdbd" },
      { key: "switch-unchecked-track-color", label: "Unchecked track", type: "color", default: "#292929" },
    ],
  },
  {
    id: "slider",
    label: "Slider",
    fields: [
      { key: "slider-color", label: "Slider color", type: "color", default: "#03a9f4" },
      { key: "slider-secondary-color", label: "Slider secondary", type: "color", default: "#5c5c5c" },
      { key: "slider-bar-color", label: "Slider bar/track", type: "color", default: "#292929" },
    ],
  },
  {
    id: "dividers",
    label: "Dividers & Outlines",
    fields: [
      { key: "divider-color", label: "Divider", type: "color", default: "#292929" },
      { key: "outline-color", label: "Outline", type: "color", default: "#3a3a3a" },
    ],
  },
  {
    id: "material",
    label: "Dialogs / Material Surfaces",
    fields: [
      { key: "mdc-theme-surface", label: "Surface", type: "color", default: "#1e1e1e" },
      { key: "material-body-text-color", label: "Body text", type: "color", default: "#ffffff" },
      { key: "material-background-color", label: "Background", type: "color", default: "#111111" },
      { key: "material-secondary-background-color", label: "Secondary background", type: "color", default: "#1c1c1c" },
    ],
  },
  {
    id: "badges",
    label: "Label Badges",
    fields: [
      { key: "label-badge-red", label: "Red", type: "color", default: "#db4437" },
      { key: "label-badge-green", label: "Green", type: "color", default: "#43a047" },
      { key: "label-badge-blue", label: "Blue", type: "color", default: "#4a90d9" },
      { key: "label-badge-yellow", label: "Yellow", type: "color", default: "#ffa600" },
      { key: "label-badge-grey", label: "Grey", type: "color", default: "#5c5c5c" },
    ],
  },
];

const ALL_FIELDS = FIELD_GROUPS.flatMap((g) => g.fields);

/* ---------------------------------------------------------------------- */
/* Minimal flat-YAML helpers (no external deps)                           */
/* ---------------------------------------------------------------------- */

// Builds a theme YAML block. `modeValues` is optional: { light: {...}, dark: {...} }.
// Mode-independent (base) vars are written at the top level; only fields the
// user actually touched in a given mode are written under `modes:`.
function buildYaml(themeName, values, modeValues) {
  const lines = [`${themeName}:`];
  for (const field of ALL_FIELDS) {
    const val = values[field.key];
    if (val === undefined || val === null || val === "") continue;
    lines.push(`  ${field.key}: "${val}"`);
  }

  const light = (modeValues && modeValues.light) || {};
  const dark = (modeValues && modeValues.dark) || {};
  const hasLight = Object.values(light).some((v) => v);
  const hasDark = Object.values(dark).some((v) => v);

  if (hasLight || hasDark) {
    lines.push(`  modes:`);
    if (hasLight) {
      lines.push(`    light:`);
      for (const field of ALL_FIELDS) {
        const val = light[field.key];
        if (val) lines.push(`      ${field.key}: "${val}"`);
      }
    }
    if (hasDark) {
      lines.push(`    dark:`);
      for (const field of ALL_FIELDS) {
        const val = dark[field.key];
        if (val) lines.push(`      ${field.key}: "${val}"`);
      }
    }
  }

  return lines.join("\n") + "\n";
}

// Parses a HA theme block, including an optional `modes: light: / dark:`
// section. Deliberately simple - assumes consistent 2-space indentation,
// which is what this card (and most hand-written themes) produce.
function parseYaml(text) {
  const lines = text.split("\n");
  let themeName = null;
  const values = {};
  const modeValues = { light: {}, dark: {} };
  let inModesBlock = false;
  let currentMode = null;

  for (let raw of lines) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indentMatch = raw.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;
    const depth = Math.round(indent / 2);
    const trimmed = raw.trim();
    const colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    let value = trimmed.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (depth === 0) {
      if (!value && !themeName) themeName = key;
      continue;
    }
    if (depth === 1) {
      if (key === "modes" && !value) {
        inModesBlock = true;
        currentMode = null;
        continue;
      }
      inModesBlock = false;
      currentMode = null;
      if (value) values[key] = value;
      continue;
    }
    if (depth === 2 && inModesBlock) {
      if ((key === "light" || key === "dark") && !value) {
        currentMode = key;
      }
      continue;
    }
    if (depth === 3 && inModesBlock && currentMode) {
      if (value) modeValues[currentMode][key] = value;
      continue;
    }
  }
  return { themeName: themeName || "my_custom_theme", values, modeValues };
}

/* ---------------------------------------------------------------------- */
/* Card element                                                           */
/* ---------------------------------------------------------------------- */

class ThemeEditorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._values = {};
    this._modeValues = { light: {}, dark: {} };
    this._activeMode = null; // null = base (both modes), or "light" / "dark"
    this._themeName = "my_custom_theme";
    this._openGroups = new Set([FIELD_GROUPS[0].id]);
  }

  // Returns the values object currently being edited: base, or the active mode's overrides.
  _activeStore() {
    return this._activeMode ? this._modeValues[this._activeMode] : this._values;
  }

  setConfig(config) {
    this._config = config || {};
    this._loadFromStorage();
    this._render();
  }

  getCardSize() {
    return 12;
  }

  connectedCallback() {
    if (!this.shadowRoot.innerHTML) this._render();
  }

  /* ---------------- storage ---------------- */

  _loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this._values = parsed.values || {};
        this._modeValues = parsed.modeValues || { light: {}, dark: {} };
        this._themeName = parsed.themeName || "my_custom_theme";
      }
    } catch (e) {
      // ignore corrupt storage
    }
  }

  _saveToStorage() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          values: this._values,
          modeValues: this._modeValues,
          themeName: this._themeName,
        })
      );
    } catch (e) {
      // storage full / unavailable - non-fatal
    }
  }

  /* ---------------- rendering ---------------- */

  _render() {
    const root = this.shadowRoot;
    root.innerHTML = `
      <style>${this._css()}</style>
      <ha-card>
        <div class="header">
          <div class="header-title">
            <ha-icon-placeholder></ha-icon-placeholder>
            <span>Theme Editor</span>
          </div>
          <div class="header-actions">
            <button class="btn-flat" id="btn-import">Import</button>
            <button class="btn-flat" id="btn-reset">Reset</button>
          </div>
        </div>

        <div class="theme-name-row">
          <label for="theme-name">Theme name</label>
          <input id="theme-name" type="text" value="${this._escAttr(this._themeName)}" placeholder="my_custom_theme" />
        </div>

        <div class="mode-bar">
          <div class="mode-toggle">
            <button class="mode-btn ${!this._activeMode ? "active" : ""}" data-mode="">Base (Both)</button>
            <button class="mode-btn ${this._activeMode === "light" ? "active" : ""}" data-mode="light">Light</button>
            <button class="mode-btn ${this._activeMode === "dark" ? "active" : ""}" data-mode="dark">Dark</button>
          </div>
          ${
            this._activeMode
              ? `<button class="btn-flat" id="btn-copy-mode">Copy from ${this._activeMode === "light" ? "Dark" : "Light"}</button>`
              : ""
          }
        </div>
        ${
          this._activeMode
            ? `<div class="mode-hint">Editing <strong>${this._activeMode}</strong> mode overrides. Empty fields inherit the Base value shown as placeholder. Click ✕ to clear an override.</div>`
            : ""
        }

        <div class="preview-wrap" id="preview-wrap">
          ${this._previewHtml()}
        </div>

        <div class="groups" id="groups">
          ${FIELD_GROUPS.map((g) => this._groupHtml(g)).join("")}
        </div>

        <div class="export-row">
          <button class="btn" id="btn-copy">Copy YAML</button>
          <button class="btn" id="btn-download">Download .yaml</button>
        </div>
        <div class="hint" id="copy-hint"></div>
      </ha-card>
    `;
    this._applyPreviewVars();
    this._bindEvents();
  }

  _groupHtml(group) {
    const isOpen = this._openGroups.has(group.id);
    return `
      <div class="group ${isOpen ? "open" : ""}" data-group="${group.id}">
        <button class="group-header" data-toggle="${group.id}">
          <span class="chevron">${isOpen ? "▾" : "▸"}</span>
          <span>${group.label}</span>
        </button>
        <div class="group-body" ${isOpen ? "" : 'style="display:none"'}>
          ${group.fields.map((f) => this._fieldHtml(f)).join("")}
        </div>
      </div>
    `;
  }

  _fieldHtml(field) {
    const store = this._activeStore();
    const val = store[field.key] ?? "";
    const isOverride = !!this._activeMode && val !== "";
    // In mode-edit context, an empty field inherits the base value - show it as the placeholder / swatch.
    const inheritedDisplay = this._activeMode ? this._values[field.key] || field.default : field.default;
    const clearBtn = `<button class="btn-clear ${isOverride ? "" : "hidden"}" data-clear="${field.key}" title="Clear override, inherit base">✕</button>`;

    if (field.type === "color") {
      const swatchVal = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val)
        ? val
        : /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(inheritedDisplay)
        ? inheritedDisplay
        : field.default;
      return `
        <div class="field">
          <label>${field.label}</label>
          <div class="field-input">
            <input type="color" data-key="${field.key}" value="${swatchVal}" />
            <input type="text" class="hex-text" data-key="${field.key}" value="${this._escAttr(val)}" placeholder="${inheritedDisplay}" />
            ${clearBtn}
          </div>
        </div>
      `;
    }
    return `
      <div class="field">
        <label>${field.label}</label>
        <div class="field-input">
          <input type="text" data-key="${field.key}" value="${this._escAttr(val)}" placeholder="${inheritedDisplay}" />
          ${clearBtn}
        </div>
      </div>
    `;
  }

  _previewHtml() {
    return `
      <div class="mockup">
        <div class="mockup-header">
          <span class="mockup-title">Preview</span>
        </div>
        <div class="mockup-body">
          <div class="mockup-sidebar">
            <div class="mockup-side-item active"><span class="dot"></span>Overview</div>
            <div class="mockup-side-item"><span class="dot"></span>Rooms</div>
            <div class="mockup-side-item"><span class="dot"></span>Settings</div>
          </div>
          <div class="mockup-main">
            <div class="mockup-card">
              <div class="mockup-card-title">Living Room Light</div>
              <div class="mockup-row">
                <span class="mockup-label">On/Off</span>
                <span class="mockup-toggle on"><span class="knob"></span></span>
              </div>
              <div class="mockup-slider"><span class="mockup-slider-fill"></span></div>
            </div>
            <div class="mockup-card">
              <div class="mockup-card-title">Temperature</div>
              <div class="mockup-big-value">21.4°C</div>
              <span class="mockup-badge success">Normal</span>
              <span class="mockup-badge warning">Warning</span>
              <span class="mockup-badge error">Error</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _applyPreviewVars() {
    const wrap = this.shadowRoot.getElementById("preview-wrap");
    if (!wrap) return;
    const modeOverrides = this._activeMode ? this._modeValues[this._activeMode] : {};
    for (const field of ALL_FIELDS) {
      const val = modeOverrides[field.key] || this._values[field.key] || field.default;
      wrap.style.setProperty(`--${field.key}`, val);
    }
  }

  /* ---------------- events ---------------- */

  _bindEvents() {
    const root = this.shadowRoot;

    root.getElementById("theme-name").addEventListener("input", (e) => {
      this._themeName = e.target.value || "my_custom_theme";
      this._saveToStorage();
    });

    root.querySelectorAll(".group-header").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.toggle;
        if (this._openGroups.has(id)) this._openGroups.delete(id);
        else this._openGroups.add(id);
        this._render();
      });
    });

    root.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._activeMode = btn.dataset.mode || null;
        this._render();
      });
    });

    const copyModeBtn = root.getElementById("btn-copy-mode");
    if (copyModeBtn) {
      copyModeBtn.addEventListener("click", () => {
        const other = this._activeMode === "light" ? "dark" : "light";
        this._modeValues[this._activeMode] = { ...this._modeValues[other] };
        this._saveToStorage();
        this._render();
      });
    }

    root.querySelectorAll("input[data-key]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
        const store = this._activeStore();
        store[key] = value;
        this._applyPreviewVars();
        this._saveToStorage();
        // keep paired color/hex inputs for the same key in sync
        root.querySelectorAll(`input[data-key="${key}"]`).forEach((other) => {
          if (other !== e.target) other.value = value;
        });
        // toggle the clear (✕) button without a full re-render, so focus/cursor is preserved while typing
        const clearBtn = e.target.closest(".field-input")?.querySelector(".btn-clear");
        if (clearBtn) clearBtn.classList.toggle("hidden", !this._activeMode || value === "");
      });
    });

    root.querySelectorAll("[data-clear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.clear;
        delete this._activeStore()[key];
        this._applyPreviewVars();
        this._saveToStorage();
        this._render();
      });
    });

    root.getElementById("btn-reset").addEventListener("click", () => {
      if (!confirm("Reset all fields (base, light and dark) and start a new blank theme?")) return;
      this._values = {};
      this._modeValues = { light: {}, dark: {} };
      this._activeMode = null;
      this._themeName = "my_custom_theme";
      this._saveToStorage();
      this._render();
    });

    root.getElementById("btn-import").addEventListener("click", () => this._openImportDialog());

    root.getElementById("btn-copy").addEventListener("click", async () => {
      const yaml = buildYaml(this._themeName, this._values, this._modeValues);
      try {
        await navigator.clipboard.writeText(yaml);
        this._showHint("Copied to clipboard.");
      } catch (e) {
        this._showHint("Could not copy automatically - select and copy manually.");
      }
    });

    root.getElementById("btn-download").addEventListener("click", () => {
      const yaml = buildYaml(this._themeName, this._values, this._modeValues);
      const blob = new Blob([yaml], { type: "text/yaml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${this._themeName || "theme"}.yaml`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  _showHint(msg) {
    const el = this.shadowRoot.getElementById("copy-hint");
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => {
      if (el.textContent === msg) el.textContent = "";
    }, 3000);
  }

  _openImportDialog() {
    const existing = this.shadowRoot.getElementById("import-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "import-overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-title">Import theme YAML</div>
        <div class="dialog-sub">Paste a Home Assistant theme block - flat or with a "modes: light: / dark:" section.</div>
        <textarea id="import-text" rows="10" placeholder="my_theme:\n  primary-color: \"#03a9f4\"\n  ..."></textarea>
        <div class="dialog-actions">
          <button class="btn-flat" id="import-cancel">Cancel</button>
          <button class="btn" id="import-apply">Apply</button>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    overlay.querySelector("#import-cancel").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#import-apply").addEventListener("click", () => {
      const text = overlay.querySelector("#import-text").value;
      if (!text.trim()) {
        overlay.remove();
        return;
      }
      const { themeName, values, modeValues } = parseYaml(text);
      this._themeName = themeName;
      this._values = values;
      this._modeValues = modeValues;
      this._activeMode = null;
      // open every group that has at least one imported value (base or mode), for visibility
      this._openGroups = new Set(
        FIELD_GROUPS.filter((g) =>
          g.fields.some((f) => values[f.key] || modeValues.light[f.key] || modeValues.dark[f.key])
        ).map((g) => g.id)
      );
      if (this._openGroups.size === 0) this._openGroups.add(FIELD_GROUPS[0].id);
      this._saveToStorage();
      overlay.remove();
      this._render();
    });
  }

  _escAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  /* ---------------- styles ---------------- */

  _css() {
    return `
      :host { display: block; }
      ha-card { padding: 16px; display: block; }
      .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
      .header-title { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 500; }
      .header-actions { display: flex; gap: 8px; }

      .theme-name-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
      .theme-name-row label { font-size: 13px; color: var(--secondary-text-color, #888); white-space: nowrap; }
      .theme-name-row input {
        flex: 1; padding: 6px 8px; border-radius: 6px;
        border: 1px solid var(--divider-color, #444);
        background: var(--card-background-color, #1e1e1e);
        color: var(--primary-text-color, #fff);
        font-family: monospace;
      }

      .btn {
        padding: 8px 14px; border-radius: 6px; border: none;
        background: var(--primary-color, #03a9f4); color: white;
        font-weight: 500; cursor: pointer; font-size: 13px;
      }
      .btn:hover { filter: brightness(1.08); }
      .btn-clear {
        border: none; background: transparent; cursor: pointer;
        color: var(--secondary-text-color, #888); font-size: 12px;
        padding: 2px 4px; flex-shrink: 0;
      }
      .btn-clear:hover { color: var(--error-color, #db4437); }
      .btn-clear.hidden { visibility: hidden; }

      .mode-bar { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
      .mode-toggle { display: flex; border: 1px solid var(--divider-color, #444); border-radius: 6px; overflow: hidden; }
      .mode-btn {
        border: none; background: transparent; color: inherit; cursor: pointer;
        padding: 6px 12px; font-size: 12px; border-right: 1px solid var(--divider-color, #444);
      }
      .mode-btn:last-child { border-right: none; }
      .mode-btn.active { background: var(--primary-color, #03a9f4); color: white; }
      .mode-hint {
        font-size: 12px; color: var(--secondary-text-color, #888);
        margin-bottom: 10px; padding: 6px 10px; border-radius: 6px;
        background: rgba(127,127,127,0.08);
      }
      .btn-flat {
        padding: 8px 12px; border-radius: 6px;
        border: 1px solid var(--divider-color, #444);
        background: transparent; color: var(--primary-text-color, inherit);
        cursor: pointer; font-size: 13px;
      }
      .btn-flat:hover { background: rgba(127,127,127,0.1); }

      .export-row { display: flex; gap: 8px; margin-top: 18px; }
      .hint { margin-top: 8px; font-size: 12px; color: var(--secondary-text-color, #888); min-height: 16px; }

      /* Groups */
      .groups { display: flex; flex-direction: column; gap: 6px; }
      .group { border: 1px solid var(--divider-color, #333); border-radius: 8px; overflow: hidden; }
      .group-header {
        width: 100%; display: flex; align-items: center; gap: 8px;
        padding: 10px 12px; background: rgba(127,127,127,0.06);
        border: none; cursor: pointer; text-align: left;
        font-size: 14px; font-weight: 500; color: inherit;
      }
      .chevron { width: 10px; display: inline-block; opacity: 0.7; }
      .group-body { padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; }
      @media (max-width: 500px) { .group-body { grid-template-columns: 1fr; } }

      .field { display: flex; flex-direction: column; gap: 4px; }
      .field label { font-size: 12px; color: var(--secondary-text-color, #888); }
      .field-input { display: flex; gap: 6px; align-items: center; }
      .field-input input[type="color"] {
        width: 32px; height: 32px; padding: 0; border: 1px solid var(--divider-color, #444);
        border-radius: 6px; background: none; cursor: pointer; flex-shrink: 0;
      }
      .field-input input[type="text"], .field-input .hex-text {
        flex: 1; min-width: 0; padding: 6px 8px; border-radius: 6px;
        border: 1px solid var(--divider-color, #444);
        background: var(--card-background-color, #1e1e1e);
        color: var(--primary-text-color, #fff);
        font-family: monospace; font-size: 12px;
      }

      /* Live mockup preview - scoped to its own CSS vars, not the real dashboard */
      .preview-wrap {
        margin-bottom: 18px; border-radius: 8px; overflow: hidden;
        border: 1px solid var(--divider-color, #333);
      }
      .mockup { background: var(--primary-background-color, #111); font-family: sans-serif; }
      .mockup-header {
        background: var(--app-header-background-color, #0b0b0b);
        color: var(--app-header-text-color, #fff);
        padding: 10px 14px; font-size: 13px; font-weight: 600;
        border-bottom: 1px solid var(--divider-color, #292929);
      }
      .mockup-body { display: flex; }
      .mockup-sidebar {
        width: 140px; background: var(--sidebar-background-color, #0b0b0b);
        border-right: 1px solid var(--sidebar-border-color, #292929);
        padding: 10px 0; flex-shrink: 0;
      }
      .mockup-side-item {
        display: flex; align-items: center; gap: 8px;
        padding: 8px 14px; font-size: 12px;
        color: var(--sidebar-text-color, #fff);
      }
      .mockup-side-item .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sidebar-icon-color, #a3a3a3); }
      .mockup-side-item.active { color: var(--sidebar-selected-text-color, #03a9f4); }
      .mockup-side-item.active .dot { background: var(--sidebar-selected-icon-color, #03a9f4); }

      .mockup-main { flex: 1; padding: 14px; display: flex; gap: var(--grid-gap, 16px); flex-wrap: wrap; }
      .mockup-card {
        background: var(--ha-card-background, #1e1e1e);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, #292929);
        border-radius: var(--ha-card-border-radius, 12px);
        padding: 12px; min-width: 160px; flex: 1;
        color: var(--primary-text-color, #fff);
      }
      .mockup-card-title {
        font-size: var(--paper-font-subhead_-_font-size, 16px);
        margin-bottom: 10px; font-weight: 600;
      }
      .mockup-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .mockup-label { font-size: var(--paper-font-caption_-_font-size, 12px); color: var(--secondary-text-color, #a3a3a3); }
      .mockup-toggle { width: 34px; height: 18px; border-radius: 9px; position: relative; display: inline-block; }
      .mockup-toggle.on { background: var(--switch-checked-track-color, #0288d1); }
      .mockup-toggle .knob {
        width: 14px; height: 14px; border-radius: 50%; background: var(--switch-checked-button-color, #03a9f4);
        position: absolute; top: 2px; right: 2px;
      }
      .mockup-slider { height: 4px; border-radius: 2px; background: var(--slider-bar-color, #292929); }
      .mockup-slider-fill { display: block; width: 65%; height: 4px; border-radius: 2px; background: var(--slider-color, #03a9f4); }
      .mockup-big-value { font-size: var(--paper-font-headline_-_font-size, 24px); font-weight: 700; margin-bottom: 8px; }
      .mockup-badge {
        display: inline-block; font-size: 11px; padding: 3px 7px; border-radius: 4px;
        margin-right: 6px; border: 1px solid; font-weight: 600;
      }
      .mockup-badge.success { color: var(--success-color, #43a047); border-color: var(--success-color, #43a047); }
      .mockup-badge.warning { color: var(--warning-color, #ffa600); border-color: var(--warning-color, #ffa600); }
      .mockup-badge.error { color: var(--error-color, #db4437); border-color: var(--error-color, #db4437); }

      /* Import dialog */
      .overlay {
        position: fixed; inset: 0; background: rgba(0,0,0,0.5);
        display: flex; align-items: center; justify-content: center; z-index: 10;
      }
      .dialog {
        background: var(--card-background-color, #1e1e1e); color: var(--primary-text-color, #fff);
        padding: 18px; border-radius: 10px; width: min(480px, 90vw);
        display: flex; flex-direction: column; gap: 10px;
      }
      .dialog-title { font-size: 16px; font-weight: 600; }
      .dialog-sub { font-size: 12px; color: var(--secondary-text-color, #888); }
      .dialog textarea {
        width: 100%; box-sizing: border-box; font-family: monospace; font-size: 12px;
        background: var(--primary-background-color, #111); color: inherit;
        border: 1px solid var(--divider-color, #444); border-radius: 6px; padding: 8px;
        resize: vertical;
      }
      .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
    `;
  }
}

customElements.define("theme-editor-card", ThemeEditorCard);

// Register with HACS/Lovelace card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: "theme-editor-card",
  name: "Theme Editor Card",
  description: "Build a Home Assistant theme visually, with a live mockup preview and YAML export.",
  preview: false,
  version: CARD_VERSION,
});
