/**
 * Theme Editor Card
 * A full-featured Home Assistant theme editor Lovelace card.
 * Live mockup preview, import/export, category groups, localStorage autosave.
 *
 * https://github.com/Okcuoglu/homeassistant-theme-editor
 * License: MIT
 */

const STORAGE_KEY = "theme-editor-card-state-v1";
const CARD_VERSION = "1.8.0";

/* ---------------------------------------------------------------------- */
/* Built-in starter presets (library)                                     */
/* ---------------------------------------------------------------------- */

const PRESETS = [
  {
    id: "warm-amber-technical",
    name: "Warm Amber Technical",
    description: "Cozy warm brown/anthracite base, amber accent, sharp technical edges.",
    values: {
      "primary-color": "#E8892B",
      "accent-color": "#FF9E42",
      "dark-primary-color": "#B8621A",
      "light-primary-color": "#3A2A1E",
      "primary-background-color": "#221A15",
      "secondary-background-color": "#2E241C",
      "card-background-color": "#2C2118",
      "app-header-background-color": "#1B1410",
      "app-header-text-color": "#F5E6D8",
      "primary-text-color": "#F5E6D8",
      "secondary-text-color": "#D9B99A",
      "disabled-text-color": "#7A6A5C",
      "sidebar-icon-color": "#D9B99A",
      "sidebar-text-color": "#F5E6D8",
      "sidebar-background-color": "#1B1410",
      "sidebar-selected-icon-color": "#FF9E42",
      "sidebar-selected-text-color": "#FF9E42",
      "sidebar-border-color": "#3A2A1E",
      "ha-card-border-radius": "2px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#4A3624",
      "ha-card-background": "#2C2118",
      "state-active-color": "#FF9E42",
      "state-inactive-color": "#7A6A5C",
      "error-color": "#E8452B",
      "warning-color": "#E8B92B",
      "success-color": "#7CB342",
      "switch-checked-color": "#FF9E42",
      "switch-checked-track-color": "#B8621A",
      "slider-color": "#FF9E42",
      "divider-color": "#3A2A1E",
    },
  },
  {
    id: "cyber-cyan",
    name: "Cyber Cyan",
    description: "Dark, futuristic HUD look - near-black base, glowing cyan accent.",
    values: {
      "primary-color": "#00E5FF",
      "accent-color": "#00B8D4",
      "dark-primary-color": "#0097A7",
      "light-primary-color": "#84FFFF",
      "primary-background-color": "#0A0E12",
      "secondary-background-color": "#111820",
      "card-background-color": "#0F1620",
      "app-header-background-color": "#060A0D",
      "app-header-text-color": "#E0F7FA",
      "primary-text-color": "#E0F7FA",
      "secondary-text-color": "#7FB8C4",
      "disabled-text-color": "#3E5158",
      "sidebar-icon-color": "#7FB8C4",
      "sidebar-text-color": "#E0F7FA",
      "sidebar-background-color": "#060A0D",
      "sidebar-selected-icon-color": "#00E5FF",
      "sidebar-selected-text-color": "#00E5FF",
      "sidebar-border-color": "#16232B",
      "ha-card-border-radius": "2px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#173039",
      "ha-card-background": "#0F1620",
      "state-active-color": "#00E5FF",
      "state-inactive-color": "#3E5158",
      "error-color": "#FF5252",
      "warning-color": "#FFD740",
      "success-color": "#00E676",
      "switch-checked-color": "#00E5FF",
      "switch-checked-track-color": "#0097A7",
      "slider-color": "#00E5FF",
      "divider-color": "#16232B",
    },
  },
  {
    id: "minimal-light",
    name: "Minimal Light",
    description: "Clean, bright, understated - soft grays with a single calm blue accent.",
    values: {
      "primary-color": "#3B82F6",
      "accent-color": "#2563EB",
      "dark-primary-color": "#1D4ED8",
      "light-primary-color": "#BFDBFE",
      "primary-background-color": "#F7F8FA",
      "secondary-background-color": "#EFF1F4",
      "card-background-color": "#FFFFFF",
      "app-header-background-color": "#FFFFFF",
      "app-header-text-color": "#1F2937",
      "primary-text-color": "#1F2937",
      "secondary-text-color": "#6B7280",
      "disabled-text-color": "#C0C4CC",
      "sidebar-icon-color": "#6B7280",
      "sidebar-text-color": "#1F2937",
      "sidebar-background-color": "#FFFFFF",
      "sidebar-selected-icon-color": "#3B82F6",
      "sidebar-selected-text-color": "#3B82F6",
      "sidebar-border-color": "#E5E7EB",
      "ha-card-border-radius": "10px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#E5E7EB",
      "ha-card-background": "#FFFFFF",
      "state-active-color": "#3B82F6",
      "state-inactive-color": "#C0C4CC",
      "error-color": "#DC2626",
      "warning-color": "#D97706",
      "success-color": "#16A34A",
      "switch-checked-color": "#3B82F6",
      "switch-checked-track-color": "#1D4ED8",
      "slider-color": "#3B82F6",
      "divider-color": "#E5E7EB",
    },
  },
  {
    id: "oszilloskop",
    name: "Oszilloskop",
    description: "Phosphorgrün auf Graphit, wie ein Messgerät im abgedunkelten Labor.",
    values: {
      "primary-color": "#4ade6a",
      "accent-color": "#c9f24a",
      "dark-primary-color": "#2f9c48",
      "light-primary-color": "#8ff0a2",
      "primary-background-color": "#0d1110",
      "secondary-background-color": "#141a18",
      "card-background-color": "#161d1b",
      "app-header-background-color": "#0d1110",
      "app-header-text-color": "#d4e8d8",
      "primary-text-color": "#dff3e2",
      "secondary-text-color": "#7f9a86",
      "text-primary-color": "#0d1110",
      "disabled-text-color": "#4a5a4f",
      "sidebar-background-color": "#0a0e0d",
      "sidebar-icon-color": "#6f8c78",
      "sidebar-text-color": "#a8c2ae",
      "sidebar-selected-icon-color": "#4ade6a",
      "sidebar-selected-text-color": "#c9f24a",
      "sidebar-border-color": "#1c2523",
      "ha-card-border-radius": "4px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#243029",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "2px",
      "mdc-shape-medium": "4px",
      "mdc-shape-large": "6px",
      "grid-gap": "8px",
      "paper-font-body1_-_font-size": "14px",
      "paper-font-caption_-_font-size": "12px",
      "paper-font-title_-_font-size": "20px",
      "state-icon-color": "#7f9a86",
      "state-icon-active-color": "#4ade6a",
      "state-active-color": "#4ade6a",
      "state-inactive-color": "#3d4a42",
      "error-color": "#ff5f52",
      "warning-color": "#e8b73a",
      "success-color": "#4ade6a",
      "switch-checked-color": "#4ade6a",
      "switch-checked-track-color": "#2f9c48",
      "switch-unchecked-button-color": "#5a6b60",
      "switch-unchecked-track-color": "#2a332e",
      "slider-color": "#4ade6a",
      "slider-secondary-color": "#c9f24a",
      "slider-bar-color": "#26312b",
      "divider-color": "#1f2926",
      "outline-color": "#2c3833",
      "mdc-theme-surface": "#161d1b",
      "material-background-color": "#0d1110",
      "material-body-text-color": "#dff3e2",
      "label-badge-green": "#4ade6a",
      "label-badge-red": "#ff5f52",
      "label-badge-blue": "#3ba7c4",
      "label-badge-yellow": "#e8b73a",
      "label-badge-grey": "#4a5a4f",
    },
  },
  {
    id: "lochkarte",
    name: "Lochkarte",
    description: "Bernstein-CRT auf warmem Schwarz, Rechenzentrum der siebziger Jahre.",
    values: {
      "primary-color": "#ffb000",
      "accent-color": "#ff7a1a",
      "dark-primary-color": "#b87c00",
      "light-primary-color": "#ffd166",
      "primary-background-color": "#120e08",
      "secondary-background-color": "#1a140c",
      "card-background-color": "#1f1810",
      "app-header-background-color": "#120e08",
      "app-header-text-color": "#f2d9a8",
      "primary-text-color": "#f5deb0",
      "secondary-text-color": "#a88c5e",
      "text-primary-color": "#120e08",
      "disabled-text-color": "#6b5934",
      "sidebar-background-color": "#0d0a05",
      "sidebar-icon-color": "#967d4f",
      "sidebar-text-color": "#d3b784",
      "sidebar-selected-icon-color": "#ffb000",
      "sidebar-selected-text-color": "#ff7a1a",
      "sidebar-border-color": "#2a2114",
      "ha-card-border-radius": "2px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#3a2d19",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "2px",
      "mdc-shape-medium": "2px",
      "mdc-shape-large": "4px",
      "grid-gap": "8px",
      "paper-font-body1_-_font-size": "14px",
      "paper-font-title_-_font-size": "20px",
      "state-icon-color": "#a88c5e",
      "state-icon-active-color": "#ffb000",
      "state-active-color": "#ffb000",
      "state-inactive-color": "#5a4a2c",
      "error-color": "#e2503c",
      "warning-color": "#ff7a1a",
      "success-color": "#c2b533",
      "switch-checked-color": "#ffb000",
      "switch-checked-track-color": "#8a6000",
      "switch-unchecked-button-color": "#7a6740",
      "switch-unchecked-track-color": "#332913",
      "slider-color": "#ffb000",
      "slider-secondary-color": "#ff7a1a",
      "slider-bar-color": "#2e2414",
      "divider-color": "#2a2114",
      "outline-color": "#3d3018",
      "mdc-theme-surface": "#1f1810",
      "material-background-color": "#120e08",
      "material-body-text-color": "#f5deb0",
      "label-badge-red": "#e2503c",
      "label-badge-green": "#c2b533",
      "label-badge-blue": "#8a8f4a",
      "label-badge-yellow": "#ffb000",
      "label-badge-grey": "#6b5934",
    },
  },
  {
    id: "schaltschrank",
    name: "Schaltschrank",
    description: "Industrieblau mit Signalorange, hart abgesetzt wie Beschriftungen an Steuertechnik.",
    values: {
      "primary-color": "#3d8fc4",
      "accent-color": "#f0821e",
      "dark-primary-color": "#2a6a95",
      "light-primary-color": "#79b6db",
      "primary-background-color": "#171b20",
      "secondary-background-color": "#1e242b",
      "card-background-color": "#222932",
      "app-header-background-color": "#1a1f25",
      "app-header-text-color": "#e2e8ee",
      "primary-text-color": "#e4e9ef",
      "secondary-text-color": "#93a1b0",
      "text-primary-color": "#12161a",
      "disabled-text-color": "#5c6874",
      "sidebar-background-color": "#12161a",
      "sidebar-icon-color": "#8896a4",
      "sidebar-text-color": "#c2ccd6",
      "sidebar-selected-icon-color": "#f0821e",
      "sidebar-selected-text-color": "#f5a45c",
      "sidebar-border-color": "#262e37",
      "ha-card-border-radius": "6px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#2d3743",
      "ha-card-box-shadow": "0 1px 2px rgba(0,0,0,0.5)",
      "mdc-shape-small": "4px",
      "mdc-shape-medium": "6px",
      "mdc-shape-large": "8px",
      "grid-gap": "10px",
      "paper-font-body1_-_font-size": "14px",
      "paper-font-title_-_font-size": "20px",
      "state-icon-color": "#93a1b0",
      "state-icon-active-color": "#f0821e",
      "state-active-color": "#f0821e",
      "state-inactive-color": "#4a5661",
      "error-color": "#e04f3d",
      "warning-color": "#f0821e",
      "success-color": "#4c9e6a",
      "switch-checked-color": "#f0821e",
      "switch-checked-track-color": "#8a4d15",
      "switch-unchecked-button-color": "#6b7783",
      "switch-unchecked-track-color": "#333c46",
      "slider-color": "#3d8fc4",
      "slider-secondary-color": "#f0821e",
      "slider-bar-color": "#2c343d",
      "divider-color": "#2a323b",
      "outline-color": "#38424e",
      "mdc-theme-surface": "#222932",
      "material-background-color": "#171b20",
      "material-body-text-color": "#e4e9ef",
      "label-badge-red": "#e04f3d",
      "label-badge-green": "#4c9e6a",
      "label-badge-blue": "#3d8fc4",
      "label-badge-yellow": "#e0b13a",
      "label-badge-grey": "#5c6874",
    },
  },
  {
    id: "messschieber",
    name: "Messschieber",
    description: "Gebürsteter Edelstahl mit kühlem Cyan, präzise und unterkühlt.",
    values: {
      "primary-color": "#4fb3bf",
      "accent-color": "#9fd8c4",
      "dark-primary-color": "#31848f",
      "light-primary-color": "#8fd3db",
      "primary-background-color": "#15191b",
      "secondary-background-color": "#1c2124",
      "card-background-color": "#212729",
      "app-header-background-color": "#171c1e",
      "app-header-text-color": "#dfe6e7",
      "primary-text-color": "#e1e7e8",
      "secondary-text-color": "#8e9a9d",
      "text-primary-color": "#12161a",
      "disabled-text-color": "#5b666a",
      "sidebar-background-color": "#111517",
      "sidebar-icon-color": "#84908f",
      "sidebar-text-color": "#c0caca",
      "sidebar-selected-icon-color": "#4fb3bf",
      "sidebar-selected-text-color": "#9fd8c4",
      "sidebar-border-color": "#242b2d",
      "ha-card-border-radius": "8px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#2c3437",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "4px",
      "mdc-shape-medium": "8px",
      "mdc-shape-large": "10px",
      "grid-gap": "10px",
      "paper-font-body1_-_font-size": "14px",
      "paper-font-title_-_font-size": "20px",
      "state-icon-color": "#8e9a9d",
      "state-icon-active-color": "#4fb3bf",
      "state-active-color": "#4fb3bf",
      "state-inactive-color": "#4a5457",
      "error-color": "#d9594c",
      "warning-color": "#d9a44c",
      "success-color": "#5fb08a",
      "switch-checked-color": "#4fb3bf",
      "switch-checked-track-color": "#2c6870",
      "switch-unchecked-button-color": "#6d787b",
      "switch-unchecked-track-color": "#313a3d",
      "slider-color": "#4fb3bf",
      "slider-secondary-color": "#9fd8c4",
      "slider-bar-color": "#2b3336",
      "divider-color": "#28302f",
      "outline-color": "#36403f",
      "mdc-theme-surface": "#212729",
      "material-background-color": "#15191b",
      "material-body-text-color": "#e1e7e8",
      "label-badge-red": "#d9594c",
      "label-badge-green": "#5fb08a",
      "label-badge-blue": "#4fb3bf",
      "label-badge-yellow": "#d9a44c",
      "label-badge-grey": "#5b666a",
    },
  },
  {
    id: "blaupause",
    name: "Blaupause",
    description: "Tiefes Preußischblau mit Kreideweiß, wie ein technischer Bauplan.",
    values: {
      "primary-color": "#7fb2e5",
      "accent-color": "#e8e3d3",
      "dark-primary-color": "#4a7cb0",
      "light-primary-color": "#aacdf0",
      "primary-background-color": "#0f1c2e",
      "secondary-background-color": "#152438",
      "card-background-color": "#182b41",
      "app-header-background-color": "#0f1c2e",
      "app-header-text-color": "#e8e3d3",
      "primary-text-color": "#e6ecf4",
      "secondary-text-color": "#8aa3bd",
      "text-primary-color": "#0f1c2e",
      "disabled-text-color": "#546e88",
      "sidebar-background-color": "#0b1626",
      "sidebar-icon-color": "#7f97b0",
      "sidebar-text-color": "#c3d3e4",
      "sidebar-selected-icon-color": "#e8e3d3",
      "sidebar-selected-text-color": "#7fb2e5",
      "sidebar-border-color": "#1d3049",
      "ha-card-border-radius": "3px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#294764",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "2px",
      "mdc-shape-medium": "3px",
      "mdc-shape-large": "5px",
      "grid-gap": "10px",
      "paper-font-body1_-_font-size": "14px",
      "paper-font-title_-_font-size": "21px",
      "state-icon-color": "#8aa3bd",
      "state-icon-active-color": "#e8e3d3",
      "state-active-color": "#7fb2e5",
      "state-inactive-color": "#456080",
      "error-color": "#e0705f",
      "warning-color": "#e0b25f",
      "success-color": "#6fb894",
      "switch-checked-color": "#7fb2e5",
      "switch-checked-track-color": "#3c6395",
      "switch-unchecked-button-color": "#6d8299",
      "switch-unchecked-track-color": "#22374e",
      "slider-color": "#7fb2e5",
      "slider-secondary-color": "#e8e3d3",
      "slider-bar-color": "#1f3450",
      "divider-color": "#213851",
      "outline-color": "#2c4a68",
      "mdc-theme-surface": "#182b41",
      "material-background-color": "#0f1c2e",
      "material-body-text-color": "#e6ecf4",
      "label-badge-red": "#e0705f",
      "label-badge-green": "#6fb894",
      "label-badge-blue": "#7fb2e5",
      "label-badge-yellow": "#e0b25f",
      "label-badge-grey": "#546e88",
    },
  },
  {
    id: "reinraum",
    name: "Reinraum",
    description: "Kaltweiße Laborflächen mit einem einzigen elektrischen Blau als Signal.",
    values: {
      "primary-color": "#1668c9",
      "accent-color": "#00a3a3",
      "dark-primary-color": "#0f4c94",
      "light-primary-color": "#7fadde",
      "primary-background-color": "#f0f3f5",
      "secondary-background-color": "#e5eaee",
      "card-background-color": "#ffffff",
      "app-header-background-color": "#ffffff",
      "app-header-text-color": "#101820",
      "primary-text-color": "#101820",
      "secondary-text-color": "#5d6b78",
      "text-primary-color": "#ffffff",
      "disabled-text-color": "#9aa6b1",
      "sidebar-background-color": "#e8edf1",
      "sidebar-icon-color": "#6c7a86",
      "sidebar-text-color": "#233039",
      "sidebar-selected-icon-color": "#1668c9",
      "sidebar-selected-text-color": "#0f4c94",
      "sidebar-border-color": "#d5dde3",
      "ha-card-border-radius": "6px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#dde3e8",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "4px",
      "mdc-shape-medium": "6px",
      "mdc-shape-large": "8px",
      "grid-gap": "10px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "21px",
      "state-icon-color": "#6c7a86",
      "state-icon-active-color": "#1668c9",
      "state-active-color": "#1668c9",
      "state-inactive-color": "#aeb8c1",
      "error-color": "#c4362b",
      "warning-color": "#c07d12",
      "success-color": "#00806b",
      "switch-checked-color": "#1668c9",
      "switch-checked-track-color": "#a8c6e8",
      "switch-unchecked-button-color": "#aeb8c1",
      "switch-unchecked-track-color": "#d8dfe4",
      "slider-color": "#1668c9",
      "slider-secondary-color": "#00a3a3",
      "slider-bar-color": "#dbe2e7",
      "divider-color": "#e0e6ea",
      "outline-color": "#c8d1d8",
      "mdc-theme-surface": "#ffffff",
      "material-background-color": "#f0f3f5",
      "material-body-text-color": "#101820",
      "label-badge-red": "#c4362b",
      "label-badge-green": "#00806b",
      "label-badge-blue": "#1668c9",
      "label-badge-yellow": "#c07d12",
      "label-badge-grey": "#9aa6b1",
    },
  },
  {
    id: "beton",
    name: "Beton",
    description: "Sichtbeton und Stahlgrau, kühl neutral mit einem rostroten Akzent.",
    values: {
      "primary-color": "#8d9499",
      "accent-color": "#b4562f",
      "dark-primary-color": "#5f676c",
      "light-primary-color": "#c3c9cc",
      "primary-background-color": "#1a1c1d",
      "secondary-background-color": "#222527",
      "card-background-color": "#26292b",
      "app-header-background-color": "#1a1c1d",
      "app-header-text-color": "#e0e3e4",
      "primary-text-color": "#e2e5e6",
      "secondary-text-color": "#9aa0a3",
      "text-primary-color": "#16181a",
      "disabled-text-color": "#666d70",
      "sidebar-background-color": "#151718",
      "sidebar-icon-color": "#8b9295",
      "sidebar-text-color": "#c6cbcd",
      "sidebar-selected-icon-color": "#b4562f",
      "sidebar-selected-text-color": "#d98a5f",
      "sidebar-border-color": "#2b2f31",
      "ha-card-border-radius": "2px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#33383a",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "2px",
      "mdc-shape-medium": "2px",
      "mdc-shape-large": "4px",
      "grid-gap": "12px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "22px",
      "state-icon-color": "#9aa0a3",
      "state-icon-active-color": "#b4562f",
      "state-active-color": "#b4562f",
      "state-inactive-color": "#565c5f",
      "error-color": "#b4402f",
      "warning-color": "#b48a2f",
      "success-color": "#6f8f6a",
      "switch-checked-color": "#b4562f",
      "switch-checked-track-color": "#6b3520",
      "switch-unchecked-button-color": "#7b8285",
      "switch-unchecked-track-color": "#383d3f",
      "slider-color": "#8d9499",
      "slider-secondary-color": "#b4562f",
      "slider-bar-color": "#32373a",
      "divider-color": "#2f3436",
      "outline-color": "#3c4143",
      "mdc-theme-surface": "#26292b",
      "material-background-color": "#1a1c1d",
      "material-body-text-color": "#e2e5e6",
      "label-badge-red": "#b4402f",
      "label-badge-green": "#6f8f6a",
      "label-badge-blue": "#5b7a8a",
      "label-badge-yellow": "#b48a2f",
      "label-badge-grey": "#666d70",
    },
  },
  {
    id: "graphitstift",
    name: "Graphitstift",
    description: "Weiches Bleistiftgrau, dunkel und völlig ruhig ohne Buntanteil.",
    values: {
      "primary-color": "#a7a49e",
      "accent-color": "#d8d2c6",
      "dark-primary-color": "#78756f",
      "light-primary-color": "#cdc9c2",
      "primary-background-color": "#1b1a19",
      "secondary-background-color": "#232221",
      "card-background-color": "#282726",
      "app-header-background-color": "#1b1a19",
      "app-header-text-color": "#e6e3de",
      "primary-text-color": "#e8e5e0",
      "secondary-text-color": "#9d9a94",
      "text-primary-color": "#1b1a19",
      "disabled-text-color": "#6a6864",
      "sidebar-background-color": "#161514",
      "sidebar-icon-color": "#918e88",
      "sidebar-text-color": "#cbc7c1",
      "sidebar-selected-icon-color": "#d8d2c6",
      "sidebar-selected-text-color": "#e8e5e0",
      "sidebar-border-color": "#2d2c2a",
      "ha-card-border-radius": "10px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#35332f",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "6px",
      "mdc-shape-medium": "10px",
      "mdc-shape-large": "14px",
      "grid-gap": "14px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "21px",
      "state-icon-color": "#9d9a94",
      "state-icon-active-color": "#d8d2c6",
      "state-active-color": "#d8d2c6",
      "state-inactive-color": "#5a5854",
      "error-color": "#b5695c",
      "warning-color": "#b59a5c",
      "success-color": "#849177",
      "switch-checked-color": "#d8d2c6",
      "switch-checked-track-color": "#6f6b63",
      "switch-unchecked-button-color": "#7e7b76",
      "switch-unchecked-track-color": "#3a3835",
      "slider-color": "#a7a49e",
      "slider-secondary-color": "#d8d2c6",
      "slider-bar-color": "#343330",
      "divider-color": "#302f2c",
      "outline-color": "#3d3b38",
      "mdc-theme-surface": "#282726",
      "material-background-color": "#1b1a19",
      "material-body-text-color": "#e8e5e0",
      "label-badge-red": "#b5695c",
      "label-badge-green": "#849177",
      "label-badge-blue": "#74838d",
      "label-badge-yellow": "#b59a5c",
      "label-badge-grey": "#6a6864",
    },
  },
  {
    id: "werkbank",
    name: "Werkbank",
    description: "Warmes Grau, Eichenholz und gebürstetes Messing, ruhig und gebrauchsfertig.",
    values: {
      "primary-color": "#8a6a3d",
      "accent-color": "#b9773a",
      "dark-primary-color": "#65502f",
      "light-primary-color": "#c4a578",
      "primary-background-color": "#edeae4",
      "secondary-background-color": "#e3dfd7",
      "card-background-color": "#f7f5f1",
      "app-header-background-color": "#e3dfd7",
      "app-header-text-color": "#2e2a24",
      "primary-text-color": "#2e2a24",
      "secondary-text-color": "#6e6659",
      "text-primary-color": "#f7f5f1",
      "disabled-text-color": "#a49a8a",
      "sidebar-background-color": "#e6e2da",
      "sidebar-icon-color": "#7a7164",
      "sidebar-text-color": "#403a31",
      "sidebar-selected-icon-color": "#b9773a",
      "sidebar-selected-text-color": "#8a6a3d",
      "sidebar-border-color": "#d5cfc4",
      "ha-card-border-radius": "10px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#ddd7cb",
      "ha-card-box-shadow": "0 1px 3px rgba(60,50,35,0.10)",
      "mdc-shape-small": "6px",
      "mdc-shape-medium": "10px",
      "mdc-shape-large": "14px",
      "grid-gap": "12px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "21px",
      "state-icon-color": "#7a7164",
      "state-icon-active-color": "#b9773a",
      "state-active-color": "#b9773a",
      "state-inactive-color": "#b0a696",
      "error-color": "#b04a35",
      "warning-color": "#c98a2b",
      "success-color": "#6a8248",
      "switch-checked-color": "#b9773a",
      "switch-checked-track-color": "#d8b489",
      "switch-unchecked-button-color": "#b6ad9e",
      "switch-unchecked-track-color": "#d8d2c7",
      "slider-color": "#8a6a3d",
      "slider-secondary-color": "#b9773a",
      "slider-bar-color": "#dcd6ca",
      "divider-color": "#ded8cd",
      "outline-color": "#cdc5b7",
      "mdc-theme-surface": "#f7f5f1",
      "material-background-color": "#edeae4",
      "material-body-text-color": "#2e2a24",
      "label-badge-red": "#b04a35",
      "label-badge-green": "#6a8248",
      "label-badge-blue": "#4a708a",
      "label-badge-yellow": "#c98a2b",
      "label-badge-grey": "#a49a8a",
    },
  },
  {
    id: "salbei",
    name: "Salbei",
    description: "Gedecktes Salbeigrün auf Kalkputz, weich und gedämpft.",
    values: {
      "primary-color": "#5f7a6a",
      "accent-color": "#8a9c72",
      "dark-primary-color": "#43584c",
      "light-primary-color": "#a7bcae",
      "primary-background-color": "#eff0ea",
      "secondary-background-color": "#e4e7de",
      "card-background-color": "#f8f9f4",
      "app-header-background-color": "#e4e7de",
      "app-header-text-color": "#252a26",
      "primary-text-color": "#252a26",
      "secondary-text-color": "#66706a",
      "text-primary-color": "#f8f9f4",
      "disabled-text-color": "#a0a89f",
      "sidebar-background-color": "#e8ebe2",
      "sidebar-icon-color": "#737d75",
      "sidebar-text-color": "#333a35",
      "sidebar-selected-icon-color": "#5f7a6a",
      "sidebar-selected-text-color": "#43584c",
      "sidebar-border-color": "#d7dcd1",
      "ha-card-border-radius": "12px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#e0e4d9",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "8px",
      "mdc-shape-medium": "12px",
      "mdc-shape-large": "16px",
      "grid-gap": "14px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "21px",
      "state-icon-color": "#737d75",
      "state-icon-active-color": "#5f7a6a",
      "state-active-color": "#5f7a6a",
      "state-inactive-color": "#adb5aa",
      "error-color": "#a55348",
      "warning-color": "#b08a3c",
      "success-color": "#5f7a6a",
      "switch-checked-color": "#5f7a6a",
      "switch-checked-track-color": "#b3c3b8",
      "switch-unchecked-button-color": "#b1b8ad",
      "switch-unchecked-track-color": "#dbdfd4",
      "slider-color": "#5f7a6a",
      "slider-secondary-color": "#8a9c72",
      "slider-bar-color": "#dde1d6",
      "divider-color": "#e1e5da",
      "outline-color": "#c9cfc3",
      "mdc-theme-surface": "#f8f9f4",
      "material-background-color": "#eff0ea",
      "material-body-text-color": "#252a26",
      "label-badge-red": "#a55348",
      "label-badge-green": "#5f7a6a",
      "label-badge-blue": "#55707f",
      "label-badge-yellow": "#b08a3c",
      "label-badge-grey": "#a0a89f",
    },
  },
  {
    id: "sandstein",
    name: "Sandstein",
    description: "Heller Kalkstein und Terrakotta, warm neutral mit viel Ruhe.",
    values: {
      "primary-color": "#9a6a55",
      "accent-color": "#c08a5e",
      "dark-primary-color": "#6f4a3a",
      "light-primary-color": "#cfa88e",
      "primary-background-color": "#f3efe8",
      "secondary-background-color": "#eae4da",
      "card-background-color": "#fbf8f3",
      "app-header-background-color": "#eae4da",
      "app-header-text-color": "#2f2823",
      "primary-text-color": "#2f2823",
      "secondary-text-color": "#71675e",
      "text-primary-color": "#fbf8f3",
      "disabled-text-color": "#a89d90",
      "sidebar-background-color": "#ede7dd",
      "sidebar-icon-color": "#7d7268",
      "sidebar-text-color": "#3c352e",
      "sidebar-selected-icon-color": "#c08a5e",
      "sidebar-selected-text-color": "#9a6a55",
      "sidebar-border-color": "#ded6c9",
      "ha-card-border-radius": "14px",
      "ha-card-border-width": "0px",
      "ha-card-border-color": "#e6dfd3",
      "ha-card-box-shadow": "0 1px 2px rgba(80,60,40,0.08)",
      "mdc-shape-small": "8px",
      "mdc-shape-medium": "14px",
      "mdc-shape-large": "18px",
      "grid-gap": "14px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-title_-_font-size": "22px",
      "state-icon-color": "#7d7268",
      "state-icon-active-color": "#c08a5e",
      "state-active-color": "#c08a5e",
      "state-inactive-color": "#b5a99b",
      "error-color": "#a9503f",
      "warning-color": "#bb8730",
      "success-color": "#6d8a63",
      "switch-checked-color": "#c08a5e",
      "switch-checked-track-color": "#dcbb9d",
      "switch-unchecked-button-color": "#b8ac9e",
      "switch-unchecked-track-color": "#ded6ca",
      "slider-color": "#9a6a55",
      "slider-secondary-color": "#c08a5e",
      "slider-bar-color": "#e2dace",
      "divider-color": "#e5ded2",
      "outline-color": "#d0c7b8",
      "mdc-theme-surface": "#fbf8f3",
      "material-background-color": "#f3efe8",
      "material-body-text-color": "#2f2823",
      "label-badge-red": "#a9503f",
      "label-badge-green": "#6d8a63",
      "label-badge-blue": "#5b7688",
      "label-badge-yellow": "#bb8730",
      "label-badge-grey": "#a89d90",
    },
  },
  {
    id: "leinenpapier",
    name: "Leinenpapier",
    description: "Ungebleichtes Papier mit Tinteschwarz, fast farblos und komplett unaufgeregt.",
    values: {
      "primary-color": "#3c4245",
      "accent-color": "#5f7a72",
      "dark-primary-color": "#23282a",
      "light-primary-color": "#8d9698",
      "primary-background-color": "#f4f3ef",
      "secondary-background-color": "#eae8e2",
      "card-background-color": "#fbfaf7",
      "app-header-background-color": "#f4f3ef",
      "app-header-text-color": "#23282a",
      "primary-text-color": "#23282a",
      "secondary-text-color": "#6b7174",
      "text-primary-color": "#fbfaf7",
      "disabled-text-color": "#a8adaf",
      "sidebar-background-color": "#efede8",
      "sidebar-icon-color": "#7d8386",
      "sidebar-text-color": "#33383a",
      "sidebar-selected-icon-color": "#5f7a72",
      "sidebar-selected-text-color": "#3c4245",
      "sidebar-border-color": "#e0ded7",
      "ha-card-border-radius": "8px",
      "ha-card-border-width": "1px",
      "ha-card-border-color": "#e5e2db",
      "ha-card-box-shadow": "none",
      "mdc-shape-small": "4px",
      "mdc-shape-medium": "8px",
      "mdc-shape-large": "12px",
      "grid-gap": "14px",
      "paper-font-body1_-_font-size": "15px",
      "paper-font-caption_-_font-size": "12px",
      "paper-font-title_-_font-size": "20px",
      "state-icon-color": "#7d8386",
      "state-icon-active-color": "#5f7a72",
      "state-active-color": "#5f7a72",
      "state-inactive-color": "#b4b8b9",
      "error-color": "#a2544a",
      "warning-color": "#b08a3c",
      "success-color": "#5f7a72",
      "switch-checked-color": "#5f7a72",
      "switch-checked-track-color": "#aebeb8",
      "switch-unchecked-button-color": "#b4b8b9",
      "switch-unchecked-track-color": "#dcdad4",
      "slider-color": "#3c4245",
      "slider-secondary-color": "#5f7a72",
      "slider-bar-color": "#dfdcd5",
      "divider-color": "#e3e0d9",
      "outline-color": "#cfccc4",
      "mdc-theme-surface": "#fbfaf7",
      "material-background-color": "#f4f3ef",
      "material-body-text-color": "#23282a",
      "label-badge-red": "#a2544a",
      "label-badge-green": "#5f7a72",
      "label-badge-blue": "#546b80",
      "label-badge-yellow": "#b08a3c",
      "label-badge-grey": "#a8adaf",
    },
  },
];

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

// Builds a card-mod theme snippet: a global default card style plus
// opt-in per-card variant classes (ha-card.elevated / .flat / .outlined /
// .glass-holo). All colors reference theme CSS vars, so it adapts to
// whichever theme/preset is currently loaded instead of hardcoding hex values.
// Requires the separate "card-mod" HACS integration to actually take effect.
// Shared CSS declarations per card variant - used both for the copyable
// card-mod YAML snippet (targeting real `ha-card`) and for the live mockup
// preview (targeting `.mockup-card`), so the preview never drifts from what
// actually gets exported.
// Card shape/style variants. Deliberately covers more than color - clip-path
// cuts, radius extremes, and glow/blur combos - since color alone was the
// original limitation being addressed here. Kept selector-agnostic (targets
// whatever selector the caller substitutes: ha-card for the real snippet,
// .mockup-card for the preview).
const CARD_VARIANT_DECLS = {
  elevated: "box-shadow: 0 4px 14px rgba(0,0,0,0.35); border: none;",
  flat: "box-shadow: none; border: none;",
  outlined: "box-shadow: none; border: 1px solid var(--divider-color);",
  glass:
    "background: color-mix(in srgb, var(--card-background-color) 55%, transparent); backdrop-filter: blur(12px) saturate(140%); border: 1px solid color-mix(in srgb, var(--primary-color) 35%, transparent); box-shadow: 0 0 24px color-mix(in srgb, var(--primary-color) 25%, transparent);",
  angular:
    "border-radius: 0; border: 1px solid var(--divider-color); clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);",
  chamfered:
    "border-radius: 0; border: 1px solid var(--divider-color); clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);",
  pill: "border-radius: 28px; box-shadow: 0 2px 10px rgba(0,0,0,0.25); border: none;",
  "neon-outline":
    "background: color-mix(in srgb, var(--card-background-color) 85%, transparent); border: 2px solid var(--primary-color); box-shadow: 0 0 16px color-mix(in srgb, var(--primary-color) 45%, transparent), inset 0 0 12px color-mix(in srgb, var(--primary-color) 15%, transparent);",
};
const CARD_VARIANT_LABELS = {
  none: "None (plain)",
  elevated: "Elevated (shadow)",
  flat: "Flat (no border/shadow)",
  outlined: "Outlined (border only)",
  glass: "Glass / Holo (blur)",
  angular: "Angular (clipped corners)",
  chamfered: "Chamfered (octagon corners)",
  pill: "Pill (fully rounded)",
  "neon-outline": "Neon Outline (glowing border)",
};

// Toggle/switch shape styles - applied to our own mockup toggle (fully
// reliable, we own that markup) and offered as a best-effort card-mod
// snippet for real ha-switch/ha-control-switch elements. Real-switch
// shadow-piercing selectors vary across HA frontend versions, so that part
// is clearly labeled as a starting point to adjust, not a guarantee.
const TOGGLE_STYLE_DECLS = {
  default: { track: "border-radius: 11px;", knob: "border-radius: 50%;" },
  square: { track: "border-radius: 6px;", knob: "border-radius: 3px;" },
  sharp: { track: "border-radius: 0;", knob: "border-radius: 0;" },
  "neon-track": {
    track: "border-radius: 11px; box-shadow: 0 0 10px color-mix(in srgb, var(--primary-color) 55%, transparent);",
    knob: "border-radius: 50%; box-shadow: 0 0 6px color-mix(in srgb, var(--primary-color) 70%, transparent);",
  },
};
const TOGGLE_STYLE_LABELS = {
  default: "Default (pill)",
  square: "Rounded square",
  sharp: "Sharp (0 radius)",
  "neon-track": "Neon glow track",
};

const DEFAULT_ADVANCED_STATE = {
  hoverElevate: true,
  variant: "elevated",
  toggleStyle: "default",
  animations: { glowPulse: false, shimmer: false, rotatingBorder: false, ripple: false },
  transitionMs: 200,
};

const HOLO_PULSE_KEYFRAMES = `@keyframes theme-editor-holo-pulse {
      0%, 100% { box-shadow: 0 0 18px color-mix(in srgb, var(--primary-color) 20%, transparent); }
      50% { box-shadow: 0 0 30px color-mix(in srgb, var(--primary-color) 45%, transparent); }
    }`;
const SHIMMER_KEYFRAMES = `@keyframes theme-editor-shimmer-sweep {
      0% { transform: translateX(-120%); }
      100% { transform: translateX(120%); }
    }`;
const ROTATE_BORDER_KEYFRAMES = `@keyframes theme-editor-rotate-border {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }`;

// Builds the animation-related CSS blocks (keyframes + rules) for a given
// selector. Animations are independent of the card variant/shape now, so
// any combination (e.g. Pill + Shimmer + Rotating Border) can be layered.
function buildAnimationBlocks(selector, animations) {
  const blocks = [];
  if (animations.glowPulse) {
    blocks.push(HOLO_PULSE_KEYFRAMES);
    blocks.push(`${selector} { animation: theme-editor-holo-pulse 3s ease-in-out infinite; }`);
  }
  if (animations.shimmer) {
    blocks.push(SHIMMER_KEYFRAMES);
    blocks.push(`${selector} { position: relative; overflow: hidden; }`);
    blocks.push(
      `${selector}::after { content: ""; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(120deg, transparent, color-mix(in srgb, var(--primary-color) 35%, transparent), transparent); animation: theme-editor-shimmer-sweep 3.5s ease-in-out infinite; pointer-events: none; }`
    );
  }
  if (animations.rotatingBorder) {
    blocks.push(ROTATE_BORDER_KEYFRAMES);
    blocks.push(`${selector} { position: relative; z-index: 0; }`);
    blocks.push(
      `${selector}::before { content: ""; position: absolute; inset: -3px; z-index: -1; border-radius: inherit; background: conic-gradient(var(--primary-color), var(--accent-color), var(--primary-color)); animation: theme-editor-rotate-border 4s linear infinite; }`
    );
  }
  if (animations.ripple) {
    // Pure-CSS approximation: a brief centered radial flash on press. A true
    // position-tracked material ripple needs JS (click coordinates), which a
    // CSS-only card-mod snippet can't do - this is the closest CSS-only effect.
    blocks.push(
      `${selector}:active { background-image: radial-gradient(circle, color-mix(in srgb, var(--primary-color) 30%, transparent) 10%, transparent 10.5%); background-size: 300% 300%; background-position: center; transition: background-position 0s; }`
    );
  }
  return blocks;
}

function buildCardModSnippet(themeName, opts) {
  const ms = opts.transitionMs || 200;
  const animations = opts.animations || {};
  const globalVariantBlock = opts.variant && opts.variant !== "none" ? `\n      ${CARD_VARIANT_DECLS[opts.variant]}` : "";
  const toggle = TOGGLE_STYLE_DECLS[opts.toggleStyle] || TOGGLE_STYLE_DECLS.default;

  const lines = [];
  lines.push(`  card-mod-theme: "${themeName}"`);
  lines.push(`  card-mod-card: |`);
  lines.push(`    ha-card {`);
  lines.push(`      transition: transform ${ms}ms ease, box-shadow ${ms}ms ease;${globalVariantBlock}`);
  lines.push(`    }`);
  if (opts.hoverElevate) {
    lines.push(`    ha-card:hover {`);
    lines.push(`      transform: translateY(-3px);`);
    lines.push(`      box-shadow: 0 10px 24px rgba(0,0,0,0.4);`);
    lines.push(`    }`);
  }
  for (const block of buildAnimationBlocks("ha-card", animations)) {
    lines.push(`    ${block}`);
  }
  lines.push(`    /* Per-card shape overrides: add card_mod: { class: elevated|flat|outlined|glass-holo|`);
  lines.push(`       angular|chamfered|pill|neon-outline } to an individual card's config to opt just`);
  lines.push(`       that card into a different look than the global default above. */`);
  for (const key of Object.keys(CARD_VARIANT_DECLS)) {
    const className = key === "glass" ? "glass-holo" : key;
    lines.push(`    ha-card.${className} { ${CARD_VARIANT_DECLS[key]} }`);
  }
  if (opts.toggleStyle && opts.toggleStyle !== "default") {
    lines.push(``);
    lines.push(`    /* Toggle/switch shape - BEST EFFORT. The exact element and shadow-DOM`);
    lines.push(`       structure for switches varies by Home Assistant frontend version and`);
    lines.push(`       card type (ha-switch, ha-control-switch, mwc-switch all exist across`);
    lines.push(`       versions). If this doesn't visibly change anything, inspect the real`);
    lines.push(`       switch with your browser's DevTools (F12) and adjust the selector below. */`);
    lines.push(`    ha-control-switch$ .switch { ${toggle.track} }`);
    lines.push(`    ha-switch$ .mdc-switch__thumb { ${toggle.knob} }`);
  }
  return lines.join("\n") + "\n";
}

// Builds plain CSS (not YAML) for the live mockup preview, targeting
// .mockup-card instead of ha-card, using the exact same variant/hover/
// transition/animation logic as buildCardModSnippet.
function buildPreviewAdvancedCss(advanced) {
  const ms = advanced.transitionMs || 200;
  const animations = advanced.animations || {};
  const variantDecl = advanced.variant && advanced.variant !== "none" ? CARD_VARIANT_DECLS[advanced.variant] : "";
  let css = `
    .mockup-card {
      transition: transform ${ms}ms ease, box-shadow ${ms}ms ease;
      ${variantDecl}
    }
  `;
  if (advanced.hoverElevate) {
    css += `
    .mockup-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 24px rgba(0,0,0,0.4);
    }`;
  }
  css += "\n" + buildAnimationBlocks(".mockup-card", animations).join("\n");

  const toggle = TOGGLE_STYLE_DECLS[advanced.toggleStyle] || TOGGLE_STYLE_DECLS.default;
  css += `
    .mockup-toggle.adv-toggle { ${toggle.track} }
    .mockup-toggle.adv-toggle .knob { ${toggle.knob} }
  `;
  return css;
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
    this._previewDevice = "desktop"; // "desktop" | "mobile"
    this._advanced = { ...DEFAULT_ADVANCED_STATE, animations: { ...DEFAULT_ADVANCED_STATE.animations } };
    this._advancedOpen = false;
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
        this._previewDevice = parsed.previewDevice || "desktop";
        // Merge with defaults so older localStorage snapshots (before toggleStyle/
        // animations existed) don't crash on missing fields.
        this._advanced = {
          ...DEFAULT_ADVANCED_STATE,
          ...(parsed.advanced || {}),
          animations: { ...DEFAULT_ADVANCED_STATE.animations, ...((parsed.advanced && parsed.advanced.animations) || {}) },
        };
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
          previewDevice: this._previewDevice,
          advanced: this._advanced,
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
            <button class="btn-flat" id="btn-presets">Presets</button>
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

        <div class="preview-toolbar">
          <span class="preview-label">Preview</span>
          <div class="preview-toolbar-actions">
            <button class="btn-flat btn-small" id="btn-full-preview">Full Preview</button>
            <div class="device-toggle">
              <button class="device-btn ${this._previewDevice === "desktop" ? "active" : ""}" data-device="desktop" title="Desktop preview">🖥</button>
              <button class="device-btn ${this._previewDevice === "mobile" ? "active" : ""}" data-device="mobile" title="Mobile preview">📱</button>
            </div>
          </div>
        </div>
        <div class="preview-wrap ${this._previewDevice === "mobile" ? "mobile" : ""}" id="preview-wrap">
          ${this._previewHtml()}
        </div>

        <div class="group advanced-group ${this._advancedOpen ? "open" : ""}">
          <button class="group-header" data-toggle-advanced>
            <span class="chevron">${this._advancedOpen ? "▾" : "▸"}</span>
            <span>Advanced (card-mod)</span>
          </button>
          <div class="group-body advanced-body" ${this._advancedOpen ? "" : 'style="display:none"'}>
            ${this._advancedBodyHtml()}
          </div>
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
    this._applyAdvancedPreview();
    this._bindEvents();
    this._bindAdvancedControls();
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
                <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
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

  // Returns only the CSS vars the theme actually defines (base + active mode
  // override) - unset fields are omitted so real fallback chains can apply,
  // same as real Home Assistant only injects vars a theme specifies.
  _computeEffectiveVars() {
    const modeOverrides = this._activeMode ? this._modeValues[this._activeMode] : {};
    const result = {};
    for (const field of ALL_FIELDS) {
      const val = modeOverrides[field.key] || this._values[field.key];
      if (val) result[field.key] = val;
    }
    return result;
  }

  _applyVarsToElement(el, vars) {
    for (const field of ALL_FIELDS) {
      if (vars[field.key]) el.style.setProperty(`--${field.key}`, vars[field.key]);
      else el.style.removeProperty(`--${field.key}`);
    }
  }

  _applyPreviewVars() {
    const wrap = this.shadowRoot.getElementById("preview-wrap");
    if (!wrap) return;
    this._applyVarsToElement(wrap, this._computeEffectiveVars());
  }

  // Injects a <style> tag into the preview so card-mod's hover/variant/
  // transition settings are visible live, without touching the real dashboard.
  _applyAdvancedPreview() {
    const wrap = this.shadowRoot.getElementById("preview-wrap");
    if (!wrap) return;
    let styleEl = wrap.querySelector("#adv-preview-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "adv-preview-style";
      wrap.appendChild(styleEl);
    }
    styleEl.textContent = buildPreviewAdvancedCss(this._advanced);
  }

  /* ---------------- events ---------------- */

  _bindEvents() {
    const root = this.shadowRoot;

    root.getElementById("theme-name").addEventListener("input", (e) => {
      this._themeName = e.target.value || "my_custom_theme";
      this._saveToStorage();
    });

    root.querySelectorAll(".group-header[data-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.toggle;
        if (this._openGroups.has(id)) this._openGroups.delete(id);
        else this._openGroups.add(id);
        this._render();
      });
    });

    const advToggle = root.querySelector("[data-toggle-advanced]");
    if (advToggle) {
      advToggle.addEventListener("click", () => {
        this._advancedOpen = !this._advancedOpen;
        this._render();
      });
    }

    root.querySelectorAll(".mode-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._activeMode = btn.dataset.mode || null;
        this._render();
      });
    });

    root.querySelectorAll(".device-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._previewDevice = btn.dataset.device;
        this._saveToStorage();
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
      if (!confirm("Reset all fields (base, light, dark, advanced) and start a new blank theme?")) return;
      this._values = {};
      this._modeValues = { light: {}, dark: {} };
      this._activeMode = null;
      this._themeName = "my_custom_theme";
      this._previewDevice = "desktop";
      this._advanced = { ...DEFAULT_ADVANCED_STATE, animations: { ...DEFAULT_ADVANCED_STATE.animations } };
      this._saveToStorage();
      this._render();
    });

    root.getElementById("btn-import").addEventListener("click", () => this._openImportDialog());
    root.getElementById("btn-presets").addEventListener("click", () => this._openPresetsDialog());
    root.getElementById("btn-full-preview").addEventListener("click", () => this._openFullPreviewDialog());

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

  _advancedBodyHtml() {
    const a = this._advanced;
    return `
      <div class="dialog-sub">
        Theme variables alone can't do shapes, buttons, or animations - that needs
        <strong>card-mod</strong> (a separate, very popular HACS integration). This generates
        a ready-to-paste snippet: a global default look for every card, plus opt-in classes
        for individual cards. Colors reference your theme variables, so it adapts to whatever
        you've set above - and updates live in the preview as you tweak it.
      </div>

      <div class="adv-controls">
        <label class="adv-row">
          <input type="checkbox" id="adv-hover" ${a.hoverElevate ? "checked" : ""} />
          Hover-elevate animation (card lifts slightly on mouseover)
        </label>

        <label class="adv-row">
          <span>Card shape / variant</span>
          <select id="adv-variant">
            ${Object.entries(CARD_VARIANT_LABELS)
              .map(([key, label]) => `<option value="${key}" ${a.variant === key ? "selected" : ""}>${label}</option>`)
              .join("")}
          </select>
        </label>

        <label class="adv-row">
          <span>Toggle / switch shape</span>
          <select id="adv-toggle-style">
            ${Object.entries(TOGGLE_STYLE_LABELS)
              .map(([key, label]) => `<option value="${key}" ${a.toggleStyle === key ? "selected" : ""}>${label}</option>`)
              .join("")}
          </select>
        </label>

        <div class="adv-row">
          <span>Animations (combinable, layered on top of the shape above)</span>
          <div class="adv-checkbox-grid">
            <label><input type="checkbox" id="adv-anim-glow" ${a.animations.glowPulse ? "checked" : ""} /> Glow pulse</label>
            <label><input type="checkbox" id="adv-anim-shimmer" ${a.animations.shimmer ? "checked" : ""} /> Shimmer sweep</label>
            <label><input type="checkbox" id="adv-anim-rotate" ${a.animations.rotatingBorder ? "checked" : ""} /> Rotating gradient border</label>
            <label><input type="checkbox" id="adv-anim-ripple" ${a.animations.ripple ? "checked" : ""} /> Press flash (ripple approximation)</label>
          </div>
        </div>

        <label class="adv-row">
          <span>Transition speed: <strong id="adv-ms-label">${a.transitionMs}ms</strong></span>
          <input type="range" id="adv-ms" min="50" max="600" step="10" value="${a.transitionMs}" />
        </label>
      </div>

      <div class="adv-row" style="margin-top: 4px;">
        <button class="btn-flat btn-small" id="adv-compare">⇔ Compare all shapes</button>
      </div>

      <div class="adv-yaml-label">Paste this into your theme file (merges alongside the fields above):</div>
      <textarea id="adv-yaml-out" rows="12" readonly></textarea>

      <div class="dialog-sub">
        To use a shape on just one card instead of the global default, add to that card's
        config: <code>card_mod:\u000A&nbsp;&nbsp;class: pill</code> (or any other shape name shown
        in the dropdown, using its lowercase id - see the comment inside the generated YAML).
        The toggle/switch snippet is best-effort - see the comment in the YAML if it doesn't
        visibly apply to your HA version.
      </div>

      <div class="adv-actions">
        <button class="btn" id="adv-copy">Copy YAML</button>
      </div>
    `;
  }

  _bindAdvancedControls() {
    const root = this.shadowRoot;
    const out = root.getElementById("adv-yaml-out");
    if (!out) return; // panel is collapsed, nothing to bind

    const refresh = () => {
      out.value = buildCardModSnippet(this._themeName, this._advanced);
      this._applyAdvancedPreview();
    };
    refresh();

    root.getElementById("adv-hover").addEventListener("change", (e) => {
      this._advanced.hoverElevate = e.target.checked;
      this._saveToStorage();
      refresh();
    });
    root.getElementById("adv-variant").addEventListener("change", (e) => {
      this._advanced.variant = e.target.value;
      this._saveToStorage();
      refresh();
    });
    root.getElementById("adv-toggle-style").addEventListener("change", (e) => {
      this._advanced.toggleStyle = e.target.value;
      this._saveToStorage();
      refresh();
    });
    const animMap = {
      "adv-anim-glow": "glowPulse",
      "adv-anim-shimmer": "shimmer",
      "adv-anim-rotate": "rotatingBorder",
      "adv-anim-ripple": "ripple",
    };
    for (const [id, key] of Object.entries(animMap)) {
      root.getElementById(id).addEventListener("change", (e) => {
        this._advanced.animations[key] = e.target.checked;
        this._saveToStorage();
        refresh();
      });
    }
    root.getElementById("adv-ms").addEventListener("input", (e) => {
      this._advanced.transitionMs = parseInt(e.target.value, 10);
      root.getElementById("adv-ms-label").textContent = `${this._advanced.transitionMs}ms`;
      this._saveToStorage();
      refresh();
    });
    root.getElementById("adv-compare").addEventListener("click", () => this._openVariantGalleryDialog());
    root.getElementById("adv-copy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(out.value);
        const btn = root.getElementById("adv-copy");
        btn.textContent = "Copied!";
        setTimeout(() => {
          if (root.getElementById("adv-copy")) root.getElementById("adv-copy").textContent = "Copy YAML";
        }, 2000);
      } catch (e) {
        // clipboard API unavailable - user can select the textarea manually
      }
    });
  }

  _openVariantGalleryDialog() {
    const existing = this.shadowRoot.getElementById("variant-gallery-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "variant-gallery-overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="dialog dialog-full">
        <div class="dialog-title-row">
          <div class="dialog-title">Compare Shapes</div>
          <button class="btn-flat btn-small" id="vg-close">Close</button>
        </div>
        <div class="dialog-sub">
          All ${Object.keys(CARD_VARIANT_LABELS).length - 1} card shapes side by side, with your
          current animations and colors applied. Click a card's name to copy the
          <code>card_mod: class: ...</code> value for that shape.
        </div>
        <div class="fp-grid" id="vg-grid">
          ${Object.entries(CARD_VARIANT_LABELS)
            .filter(([key]) => key !== "none")
            .map(
              ([key, label]) => `
              <div class="mockup-card fp-card vg-card" data-variant="${key}" style="${key !== "none" ? CARD_VARIANT_DECLS[key] : ""}">
                <div class="mockup-card-title">${label}</div>
                <div class="mockup-row">
                  <span class="mockup-label">On/Off</span>
                  <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
                </div>
                <div class="mockup-slider"><span class="mockup-slider-fill" style="width:60%"></span></div>
                <button class="vg-copy-class" data-class="${key === "glass" ? "glass-holo" : key}">card_mod: class: ${key === "glass" ? "glass-holo" : key}</button>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    const dialogEl = overlay.querySelector(".dialog-full");
    this._applyVarsToElement(dialogEl, this._computeEffectiveVars());

    // Animations (independent of shape) applied uniformly across every card in the gallery,
    // same as the live preview - only the shape/variant itself differs per card.
    const styleTag = document.createElement("style");
    styleTag.textContent = buildAnimationBlocks(".vg-card", this._advanced.animations).join("\n");
    overlay.appendChild(styleTag);

    overlay.querySelector("#vg-close").addEventListener("click", () => overlay.remove());
    overlay.querySelectorAll(".vg-copy-class").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        try {
          await navigator.clipboard.writeText(`card_mod:\n  class: ${btn.dataset.class}`);
          const original = btn.textContent;
          btn.textContent = "Copied!";
          setTimeout(() => {
            btn.textContent = original;
          }, 1500);
        } catch (err) {
          // clipboard unavailable - non-fatal, button still shows the value to copy manually
        }
      });
    });
  }

  _openFullPreviewDialog() {
    const existing = this.shadowRoot.getElementById("full-preview-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "full-preview-overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="dialog dialog-full">
        <div class="dialog-title-row">
          <div class="dialog-title">Full Preview</div>
          <div class="dialog-title-actions">
            <button class="btn-flat btn-small" id="fp-refresh">↻ Refresh</button>
            <button class="btn-flat btn-small" id="fp-close">Close</button>
          </div>
        </div>
        <div class="dialog-sub">
          A snapshot of common Home Assistant card types with your current theme applied.
          Not every possible card exists here - real dashboards have far more variety - but
          this covers the most common ones. Hit Refresh after editing fields elsewhere to
          re-sync this snapshot.
        </div>
        <div class="fp-grid" id="fp-grid">
          ${this._fullPreviewCardsHtml()}
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);
    this._applyVarsToElement(overlay.querySelector(".dialog-full"), this._computeEffectiveVars());

    overlay.querySelector("#fp-close").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#fp-refresh").addEventListener("click", () => {
      overlay.querySelector("#fp-grid").innerHTML = this._fullPreviewCardsHtml();
      this._applyVarsToElement(overlay.querySelector(".dialog-full"), this._computeEffectiveVars());
    });
  }

  _fullPreviewCardsHtml() {
    return `
      <div class="mockup-card fp-card">
        <div class="mockup-card-title">Living Room Light</div>
        <div class="mockup-row">
          <span class="mockup-label">On/Off</span>
          <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
        </div>
        <div class="mockup-slider"><span class="mockup-slider-fill" style="width:72%"></span></div>
      </div>

      <div class="mockup-card fp-card fp-thermostat">
        <div class="mockup-card-title">Climate</div>
        <div class="fp-dial">
          <div class="fp-dial-value">21.5°</div>
          <div class="fp-dial-sub">Heating to 22°</div>
        </div>
        <div class="fp-chip-row">
          <span class="fp-chip active">Heat</span>
          <span class="fp-chip">Cool</span>
          <span class="fp-chip">Off</span>
        </div>
      </div>

      <div class="mockup-card fp-card fp-weather">
        <div class="mockup-card-title">Weather</div>
        <div class="fp-weather-main">
          <span class="fp-weather-icon">⛅</span>
          <span class="fp-weather-temp">18°</span>
        </div>
        <div class="fp-weather-row">
          <span>Mon 20°</span><span>Tue 17°</span><span>Wed 19°</span><span>Thu 21°</span>
        </div>
      </div>

      <div class="mockup-card fp-card fp-media">
        <div class="mockup-card-title">Living Room Speaker</div>
        <div class="fp-media-row">
          <div class="fp-media-art"></div>
          <div class="fp-media-info">
            <div class="fp-media-track">Song Title</div>
            <div class="fp-media-artist">Artist Name</div>
          </div>
        </div>
        <div class="mockup-slider"><span class="mockup-slider-fill" style="width:38%"></span></div>
        <div class="fp-media-controls">⏮ &nbsp; ⏸ &nbsp; ⏭</div>
      </div>

      <div class="mockup-card fp-card fp-graph">
        <div class="mockup-card-title">Temperature History</div>
        <svg class="fp-sparkline" viewBox="0 0 200 60" preserveAspectRatio="none">
          <polyline points="0,40 20,35 40,38 60,20 80,25 100,15 120,22 140,10 160,18 180,12 200,20" fill="none" stroke-width="2" />
        </svg>
        <div class="mockup-big-value" style="font-size:20px">21.4°C</div>
      </div>

      <div class="mockup-card fp-card fp-entities">
        <div class="mockup-card-title">Entities</div>
        <div class="fp-entity-row"><span class="fp-entity-icon">💡</span><span class="fp-entity-name">Kitchen Light</span><span class="mockup-toggle adv-toggle on"><span class="knob"></span></span></div>
        <div class="fp-entity-row"><span class="fp-entity-icon">🌡</span><span class="fp-entity-name">Living Room Temp</span><span class="fp-entity-value">21.4°C</span></div>
        <div class="fp-entity-row"><span class="fp-entity-icon">🔒</span><span class="fp-entity-name">Front Door</span><span class="fp-entity-value">Locked</span></div>
      </div>

      <div class="mockup-card fp-card fp-alarm">
        <div class="mockup-card-title">Alarm</div>
        <div class="fp-alarm-status">Armed Home</div>
        <div class="fp-keypad">
          ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((n) => `<span class="fp-key">${n}</span>`).join("")}
        </div>
      </div>

      <div class="mockup-card fp-card fp-camera">
        <div class="mockup-card-title">Front Door Camera</div>
        <div class="fp-camera-placeholder">📷</div>
      </div>

      <div class="mockup-card fp-card fp-button-card">
        <div class="fp-button-icon">⏻</div>
        <div class="fp-button-label">Garage Door</div>
      </div>

      <div class="mockup-card fp-card fp-gauge">
        <div class="mockup-card-title">Humidity</div>
        <div class="fp-gauge-ring"><span class="fp-gauge-value">46%</span></div>
      </div>

      <div class="mockup-card fp-card fp-badges">
        <div class="mockup-card-title">Status &amp; Badges</div>
        <div class="fp-badge-row">
          <span class="mockup-badge success">Normal</span>
          <span class="mockup-badge warning">Warning</span>
          <span class="mockup-badge error">Error</span>
        </div>
        <div class="fp-badge-row">
          <span class="fp-dot" style="background:var(--label-badge-red)"></span>
          <span class="fp-dot" style="background:var(--label-badge-green)"></span>
          <span class="fp-dot" style="background:var(--label-badge-blue)"></span>
          <span class="fp-dot" style="background:var(--label-badge-yellow)"></span>
          <span class="fp-dot" style="background:var(--label-badge-grey)"></span>
        </div>
      </div>
    `;
  }

  _openPresetsDialog() {
    const existing = this.shadowRoot.getElementById("presets-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "presets-overlay";
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="dialog">
        <div class="dialog-title">Starter presets</div>
        <div class="dialog-sub">Loading a preset replaces your current base colors (Light/Dark overrides are kept). This can't be undone from here - export first if you want to keep your current work.</div>
        <div class="preset-list">
          ${PRESETS.map(
            (p) => `
            <div class="preset-item">
              <div class="preset-swatches">
                ${["primary-color", "primary-background-color", "card-background-color", "accent-color"]
                  .map((k) => `<span class="preset-swatch" style="background:${p.values[k] || "#333"}"></span>`)
                  .join("")}
              </div>
              <div class="preset-info">
                <div class="preset-name">${p.name}</div>
                <div class="preset-desc">${p.description}</div>
              </div>
              <button class="btn" data-preset="${p.id}">Load</button>
            </div>
          `
          ).join("")}
        </div>
        <div class="dialog-actions">
          <button class="btn-flat" id="presets-cancel">Close</button>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    overlay.querySelector("#presets-cancel").addEventListener("click", () => overlay.remove());
    overlay.querySelectorAll("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
        if (!preset) return;
        this._values = { ...preset.values };
        this._themeName = preset.id.replace(/-/g, "_");
        this._activeMode = null;
        this._openGroups = new Set(
          FIELD_GROUPS.filter((g) => g.fields.some((f) => preset.values[f.key])).map((g) => g.id)
        );
        this._saveToStorage();
        overlay.remove();
        this._render();
      });
    });
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
      .advanced-body { display: block !important; }
      .adv-actions { margin-top: 10px; }

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
      .preview-toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
      .preview-toolbar-actions { display: flex; align-items: center; gap: 8px; }
      .btn-small { padding: 4px 10px; font-size: 12px; }
      .preview-label { font-size: 12px; color: var(--secondary-text-color, #888); text-transform: uppercase; letter-spacing: 0.04em; }
      .device-toggle { display: flex; border: 1px solid var(--divider-color, #444); border-radius: 6px; overflow: hidden; }
      .device-btn {
        border: none; background: transparent; cursor: pointer;
        padding: 4px 10px; font-size: 13px; border-right: 1px solid var(--divider-color, #444);
        filter: grayscale(1); opacity: 0.6;
      }
      .device-btn:last-child { border-right: none; }
      .device-btn.active { background: rgba(127,127,127,0.15); filter: none; opacity: 1; }

      .preview-wrap {
        margin-bottom: 18px; border-radius: 8px; overflow: hidden;
        border: 1px solid var(--divider-color, #333);
      }
      .preview-wrap.mobile { display: flex; justify-content: center; padding: 16px; background: rgba(0,0,0,0.15); }
      .preview-wrap.mobile .mockup {
        width: 300px; border-radius: 22px; overflow: hidden;
        border: 6px solid #000; box-shadow: 0 4px 16px rgba(0,0,0,0.4);
      }
      .preview-wrap.mobile .mockup-sidebar { display: none; }
      .preview-wrap.mobile .mockup-body { flex-direction: column; }
      .preview-wrap.mobile .mockup-main { flex-direction: column; }
      .preview-wrap.mobile .mockup-card { min-width: 0; }
      .preview-wrap.mobile .mockup-header {
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; padding: 8px 10px;
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
        background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #292929));
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

      /* Full Preview dialog */
      .dialog-full { width: min(960px, 96vw); max-height: 88vh; overflow-y: auto; }
      .dialog-title-row { display: flex; align-items: center; justify-content: space-between; }
      .dialog-title-actions { display: flex; gap: 8px; }
      .fp-grid {
        display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 12px; margin-top: 8px;
      }
      .fp-card { color: var(--primary-text-color, #fff); }

      /* Thermostat */
      .fp-dial {
        width: 96px; height: 96px; border-radius: 50%; margin: 8px auto;
        border: 4px solid var(--primary-color, #03a9f4);
        display: flex; flex-direction: column; align-items: center; justify-content: center;
      }
      .fp-dial-value { font-size: 20px; font-weight: 700; }
      .fp-dial-sub { font-size: 10px; color: var(--secondary-text-color, #a3a3a3); text-align: center; }
      .fp-chip-row { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
      .fp-chip {
        font-size: 10px; padding: 3px 8px; border-radius: 10px;
        border: 1px solid var(--divider-color, #292929); color: var(--secondary-text-color, #a3a3a3);
      }
      .fp-chip.active { background: var(--primary-color, #03a9f4); color: white; border-color: var(--primary-color, #03a9f4); }

      /* Weather */
      .fp-weather-main { display: flex; align-items: center; gap: 10px; margin: 6px 0; }
      .fp-weather-icon { font-size: 28px; }
      .fp-weather-temp { font-size: 26px; font-weight: 700; }
      .fp-weather-row { display: flex; justify-content: space-between; font-size: 11px; color: var(--secondary-text-color, #a3a3a3); }

      /* Media player */
      .fp-media-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
      .fp-media-art { width: 40px; height: 40px; border-radius: 6px; background: var(--accent-color, #ff9800); flex-shrink: 0; }
      .fp-media-track { font-size: 13px; font-weight: 600; }
      .fp-media-artist { font-size: 11px; color: var(--secondary-text-color, #a3a3a3); }
      .fp-media-controls { text-align: center; margin-top: 8px; font-size: 16px; letter-spacing: 4px; }

      /* Graph / sparkline */
      .fp-sparkline { width: 100%; height: 44px; margin: 6px 0; }
      .fp-sparkline polyline { stroke: var(--primary-color, #03a9f4); }

      /* Entities list */
      .fp-entity-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; font-size: 12px; }
      .fp-entity-icon { flex-shrink: 0; }
      .fp-entity-name { flex: 1; }
      .fp-entity-value { color: var(--secondary-text-color, #a3a3a3); }

      /* Alarm */
      .fp-alarm-status {
        text-align: center; font-size: 12px; font-weight: 600; margin: 6px 0;
        color: var(--state-active-color, #03a9f4);
      }
      .fp-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
      .fp-key {
        text-align: center; padding: 6px 0; font-size: 12px; border-radius: 4px;
        background: var(--secondary-background-color, #1c1c1c); color: var(--primary-text-color, #fff);
      }

      /* Camera */
      .fp-camera-placeholder {
        height: 90px; border-radius: 6px; background: var(--secondary-background-color, #1c1c1c);
        display: flex; align-items: center; justify-content: center; font-size: 26px; opacity: 0.6;
      }

      /* Button card */
      .fp-button-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-height: 90px; }
      .fp-button-icon { font-size: 26px; color: var(--state-icon-active-color, #03a9f4); }
      .fp-button-label { font-size: 12px; }

      /* Gauge */
      .fp-gauge-ring {
        width: 90px; height: 90px; border-radius: 50%; margin: 8px auto;
        background: conic-gradient(var(--primary-color, #03a9f4) 46%, var(--divider-color, #292929) 0);
        display: flex; align-items: center; justify-content: center;
      }
      .fp-gauge-ring::before {
        content: ""; position: absolute; width: 66px; height: 66px; border-radius: 50%;
        background: var(--ha-card-background, var(--card-background-color, #1e1e1e));
      }
      .fp-gauge-ring { position: relative; }
      .fp-gauge-value { position: relative; z-index: 1; font-size: 15px; font-weight: 700; }

      /* Badges card */
      .fp-badge-row { display: flex; gap: 8px; align-items: center; margin: 6px 0; }
      .fp-dot { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }

      /* Variant comparison gallery */
      .vg-copy-class {
        margin-top: 10px; width: 100%; padding: 5px 8px; font-size: 10px;
        font-family: monospace; border-radius: 4px; cursor: pointer;
        background: rgba(127,127,127,0.12); border: 1px solid var(--divider-color, #292929);
        color: var(--secondary-text-color, #a3a3a3);
      }
      .vg-copy-class:hover { background: rgba(127,127,127,0.22); }


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
      .dialog-wide { width: min(560px, 92vw); }
      .dialog-title { font-size: 16px; font-weight: 600; }
      .dialog-sub { font-size: 12px; color: var(--secondary-text-color, #888); }
      .dialog textarea {
        width: 100%; box-sizing: border-box; font-family: monospace; font-size: 12px;
        background: var(--primary-background-color, #111); color: inherit;
        border: 1px solid var(--divider-color, #444); border-radius: 6px; padding: 8px;
        resize: vertical;
      }
      .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }

      .preset-list { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; }
      .preset-item {
        display: flex; align-items: center; gap: 10px;
        border: 1px solid var(--divider-color, #444); border-radius: 8px; padding: 8px 10px;
      }
      .preset-swatches { display: flex; flex-shrink: 0; }
      .preset-swatch {
        width: 16px; height: 16px; border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.2);
        margin-left: -6px;
      }
      .preset-swatch:first-child { margin-left: 0; }
      .preset-info { flex: 1; min-width: 0; }
      .preset-name { font-size: 13px; font-weight: 600; }
      .preset-desc { font-size: 11px; color: var(--secondary-text-color, #888); }

      .adv-controls { display: flex; flex-direction: column; gap: 12px; }
      .adv-row { display: flex; flex-direction: column; gap: 6px; font-size: 13px; }
      .adv-row:has(> input[type="checkbox"]) { flex-direction: row; align-items: center; gap: 8px; }
      .adv-row select, .adv-row input[type="range"] { width: 100%; }
      .adv-row select {
        padding: 6px 8px; border-radius: 6px; border: 1px solid var(--divider-color, #444);
        background: var(--primary-background-color, #111); color: inherit;
      }
      .adv-yaml-label { font-size: 12px; color: var(--secondary-text-color, #888); margin-top: 4px; }
      .adv-checkbox-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; margin-top: 4px;
      }
      .adv-checkbox-grid label { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: normal; }
      @media (max-width: 420px) { .adv-checkbox-grid { grid-template-columns: 1fr; } }
      #adv-yaml-out {
        width: 100%; box-sizing: border-box; font-family: monospace; font-size: 11px;
        background: var(--primary-background-color, #111); color: inherit;
        border: 1px solid var(--divider-color, #444); border-radius: 6px; padding: 8px;
        resize: vertical;
      }
      .dialog-sub code {
        background: rgba(127,127,127,0.15); padding: 1px 5px; border-radius: 4px;
        font-family: monospace; font-size: 11px; white-space: pre;
      }
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