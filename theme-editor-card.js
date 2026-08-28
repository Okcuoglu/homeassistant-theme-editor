/**
 * Theme Editor Card
 * A full-featured Home Assistant theme editor Lovelace card.
 * v2.0.0: three-zone workspace (topbar / section nav + content + live
 * preview / YAML drawer), replacing the single scrolling accordion column.
 * Layout redesign handed off via Claude Design; see the project's design
 * handoff notes for the original spec (chrome palette, sizing, breakpoints).
 *
 * https://github.com/Okcuoglu/homeassistant-theme-editor
 * License: MIT
 */

const STORAGE_KEY = "theme-editor-card-state-v1";
const CARD_VERSION = "2.3.0";

/* ---------------------------------------------------------------------- */
/* Variable schema                                                        */
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
    hint: "The four lead colors. They drive accents, icons, and active states across the whole dashboard.",
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
    hint: "Surfaces for the view, cards, and header. The contrast between card and view controls readability.",
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
    hint: "Text colors in descending importance.",
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
    hint: "Its own palette for the navigation rail, independent from the cards.",
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
    hint: "Radii, borders, and spacing. Values in px.",
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
      { key: "ha-box-shadow-s", label: "Box shadow (small, 2026.5+)", type: "text", default: "0 1px 2px rgba(0,0,0,0.3)" },
      { key: "ha-box-shadow-m", label: "Box shadow (medium, 2026.5+)", type: "text", default: "0 2px 6px rgba(0,0,0,0.35)" },
      { key: "ha-box-shadow-l", label: "Box shadow (large, 2026.5+)", type: "text", default: "0 8px 24px rgba(0,0,0,0.45)" },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    hint: "Paper-style font sizes. Don't go under 14px on wall panels.",
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
    hint: "States of entities and messages.",
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
    hint: "Toggle switches, per knob and track. ha-switch was migrated to a new component in HA 2026.5 - the six \"legacy\" fields below may no longer have any effect on current Home Assistant versions; the ha-switch-* fields are the current tokens.",
    fields: [
      { key: "switch-checked-color", label: "Checked (legacy)", type: "color", default: "#03a9f4" },
      { key: "switch-unchecked-color", label: "Unchecked (legacy)", type: "color", default: "#5c5c5c" },
      { key: "switch-checked-button-color", label: "Checked button (legacy)", type: "color", default: "#03a9f4" },
      { key: "switch-checked-track-color", label: "Checked track (legacy)", type: "color", default: "#0288d1" },
      { key: "switch-unchecked-button-color", label: "Unchecked button (legacy)", type: "color", default: "#bdbdbd" },
      { key: "switch-unchecked-track-color", label: "Unchecked track (legacy)", type: "color", default: "#292929" },
      { key: "ha-switch-size", label: "Size", type: "text", unit: "px", default: "24px" },
      { key: "ha-switch-thumb-size", label: "Thumb size", type: "text", unit: "px", default: "16px" },
      { key: "ha-switch-width", label: "Width", type: "text", unit: "px", default: "40px" },
      { key: "ha-switch-background-color", label: "Background", type: "color", default: "#5c5c5c" },
      { key: "ha-switch-thumb-background-color", label: "Thumb background", type: "color", default: "#ffffff" },
      { key: "ha-switch-background-color-hover", label: "Background (hover)", type: "color", default: "#6c6c6c" },
      { key: "ha-switch-thumb-background-color-hover", label: "Thumb background (hover)", type: "color", default: "#ffffff" },
      { key: "ha-switch-checked-background-color", label: "Checked background", type: "color", default: "#03a9f4" },
      { key: "ha-switch-checked-thumb-background-color", label: "Checked thumb background", type: "color", default: "#ffffff" },
      { key: "ha-switch-checked-background-color-hover", label: "Checked background (hover)", type: "color", default: "#33bbf6" },
      { key: "ha-switch-checked-thumb-background-color-hover", label: "Checked thumb background (hover)", type: "color", default: "#ffffff" },
      { key: "ha-switch-border-color", label: "Border", type: "color", default: "#5c5c5c" },
      { key: "ha-switch-thumb-border-color", label: "Thumb border", type: "color", default: "#5c5c5c" },
      { key: "ha-switch-thumb-border-color-hover", label: "Thumb border (hover)", type: "color", default: "#6c6c6c" },
      { key: "ha-switch-checked-border-color", label: "Checked border", type: "color", default: "#03a9f4" },
      { key: "ha-switch-checked-thumb-border-color", label: "Checked thumb border", type: "color", default: "#03a9f4" },
      { key: "ha-switch-checked-border-color-hover", label: "Checked border (hover)", type: "color", default: "#33bbf6" },
      { key: "ha-switch-checked-thumb-border-color-hover", label: "Checked thumb border (hover)", type: "color", default: "#33bbf6" },
      { key: "ha-switch-thumb-box-shadow", label: "Thumb box shadow", type: "text", default: "0 1px 3px rgba(0,0,0,0.3)" },
      { key: "ha-switch-disabled-opacity", label: "Disabled opacity", type: "text", default: "0.5" },
      { key: "ha-switch-required-marker", label: "Required marker", type: "text", default: "*" },
      { key: "ha-switch-required-marker-offset", label: "Required marker offset", type: "text", unit: "px", default: "2px" },
    ],
  },
  {
    id: "checkboxes",
    label: "Checkboxes",
    hint: "ha-checkbox was migrated to a new component in HA 2026.5 (webawesome-based) - old MDC checkbox tokens no longer apply, these are the current ones.",
    fields: [
      { key: "ha-checkbox-size", label: "Size", type: "text", unit: "px", default: "18px" },
      { key: "ha-checkbox-border-color", label: "Border", type: "color", default: "#5c5c5c" },
      { key: "ha-checkbox-border-color-hover", label: "Border (hover)", type: "color", default: "#03a9f4" },
      { key: "ha-checkbox-background-color", label: "Background", type: "color", default: "#1e1e1e" },
      { key: "ha-checkbox-background-color-hover", label: "Background (hover)", type: "color", default: "#2a2a2a" },
      { key: "ha-checkbox-checked-background-color", label: "Checked background", type: "color", default: "#03a9f4" },
      { key: "ha-checkbox-checked-background-color-hover", label: "Checked background (hover)", type: "color", default: "#33bbf6" },
      { key: "ha-checkbox-checked-icon-color", label: "Checked icon", type: "color", default: "#ffffff" },
      { key: "ha-checkbox-checked-icon-scale", label: "Checked icon scale", type: "text", default: "1" },
      { key: "ha-checkbox-border-radius", label: "Border radius", type: "text", unit: "px", default: "4px" },
      { key: "ha-checkbox-border-width", label: "Border width", type: "text", unit: "px", default: "2px" },
      { key: "ha-checkbox-required-marker", label: "Required marker", type: "text", default: "*" },
      { key: "ha-checkbox-required-marker-offset", label: "Required marker offset", type: "text", unit: "px", default: "2px" },
    ],
  },
  {
    id: "progress",
    label: "Progress Bar",
    hint: "ha-progress-bar replaced mwc-progress-bar in HA 2026.5 and is fully themeable via these tokens.",
    fields: [
      { key: "ha-progress-bar-indicator-color", label: "Indicator", type: "color", default: "#03a9f4" },
      { key: "ha-progress-bar-indicator-background", label: "Indicator background", type: "color", default: "#03a9f4" },
      { key: "ha-progress-bar-track-color", label: "Track", type: "color", default: "#292929" },
      { key: "ha-progress-bar-track-height", label: "Track height", type: "text", unit: "px", default: "4px" },
      { key: "ha-progress-bar-border-radius", label: "Border radius", type: "text", unit: "px", default: "2px" },
      { key: "ha-progress-bar-animation-duration", label: "Animation duration", type: "text", default: "1s" },
      { key: "ha-progress-bar-indicator-highlight-image", label: "Indicator highlight image", type: "text", default: "none" },
      { key: "ha-progress-bar-indicator-highlight-width", label: "Indicator highlight width", type: "text", unit: "px", default: "0px" },
      { key: "ha-progress-bar-indicator-highlight-height", label: "Indicator highlight height", type: "text", unit: "px", default: "0px" },
    ],
  },
  {
    id: "slider",
    label: "Slider & Lines",
    hint: "Sliders, dividers, and outlines.",
    fields: [
      { key: "slider-color", label: "Slider color", type: "color", default: "#03a9f4" },
      { key: "slider-secondary-color", label: "Slider secondary", type: "color", default: "#5c5c5c" },
      { key: "slider-bar-color", label: "Slider bar/track", type: "color", default: "#292929" },
      { key: "divider-color", label: "Divider", type: "color", default: "#292929" },
      { key: "outline-color", label: "Outline", type: "color", default: "#3a3a3a" },
    ],
  },
  {
    id: "material",
    label: "Dialogs / Material Surfaces",
    hint: "Material surfaces in dialogs and menus. The ha-color-surface-* set is forward-looking (introduced in HA 2026.5, currently only affects ha-tooltip per HA's own release notes - expect it to apply more broadly in future versions).",
    fields: [
      { key: "mdc-theme-surface", label: "Surface", type: "color", default: "#1e1e1e" },
      { key: "material-body-text-color", label: "Body text", type: "color", default: "#ffffff" },
      { key: "material-background-color", label: "Background", type: "color", default: "#111111" },
      { key: "material-secondary-background-color", label: "Secondary background", type: "color", default: "#1c1c1c" },
      { key: "ha-color-surface-default", label: "Surface default (2026.5+)", type: "color", default: "#1e1e1e" },
      { key: "ha-color-surface-low", label: "Surface low (2026.5+)", type: "color", default: "#181818" },
      { key: "ha-color-surface-lower", label: "Surface lower (2026.5+)", type: "color", default: "#111111" },
      { key: "ha-color-surface-default-inverted", label: "Surface default, inverted (2026.5+)", type: "color", default: "#ffffff" },
      { key: "ha-color-surface-low-inverted", label: "Surface low, inverted (2026.5+)", type: "color", default: "#f2f2f2" },
      { key: "ha-color-surface-lower-inverted", label: "Surface lower, inverted (2026.5+)", type: "color", default: "#e5e5e5" },
    ],
  },
  {
    id: "inputs",
    label: "Input Fields",
    hint: "Backgrounds and text of text fields, dropdowns, and search boxes across ALL of Home Assistant (not just cards) - e.g. the automation editor, entity search, HACS dialogs. These variable names have shifted across recent HA versions (Material Design 3 migration in 2026.4 introduced the md-sys-color-* set, and ha-color-form-background is a further newer token) - if one set doesn't visibly apply on your HA version, try the others.",
    fields: [
      { key: "input-fill-color", label: "Fill (legacy)", type: "color", default: "#1e1e1e" },
      { key: "input-ink-color", label: "Text (legacy)", type: "color", default: "#ffffff" },
      { key: "input-label-ink-color", label: "Label (legacy)", type: "color", default: "#a3a3a3" },
      { key: "input-disabled-ink-color", label: "Disabled text (legacy)", type: "color", default: "#5c5c5c" },
      { key: "input-idle-line-color", label: "Idle underline (legacy)", type: "color", default: "#5c5c5c" },
      { key: "input-hover-line-color", label: "Hover underline (legacy)", type: "color", default: "#ffffff" },
      { key: "mdc-text-field-fill-color", label: "Text field fill", type: "color", default: "#1e1e1e" },
      { key: "mdc-select-fill-color", label: "Select/dropdown fill", type: "color", default: "#1e1e1e" },
      { key: "md-sys-color-surface", label: "MD3 surface", type: "color", default: "#1e1e1e" },
      { key: "md-sys-color-surface-container", label: "MD3 surface container", type: "color", default: "#1e1e1e" },
      { key: "md-sys-color-on-surface", label: "MD3 text on surface", type: "color", default: "#ffffff" },
      { key: "md-sys-color-on-surface-variant", label: "MD3 text on surface (muted)", type: "color", default: "#a3a3a3" },
      { key: "ha-color-form-background", label: "Form field background", type: "color", default: "#1e1e1e" },
    ],
  },
  {
    id: "badges",
    label: "Label Badges",
    hint: "Five fixed badge colors.",
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
const KNOWN_FIELD_KEYS = new Set(ALL_FIELDS.map((f) => f.key));

// Domains Home Assistant documents as supporting per-state color overrides
// (state-{domain}-{device_class}-{state}-color, state-{domain}-{state}-color,
// state-{domain}-(active|inactive)-color) - see the "State color" section of
// https://www.home-assistant.io/integrations/frontend/#state-color
const STATE_COLOR_DOMAINS = [
  "alarm_control_panel", "alert", "automation", "binary_sensor", "calendar",
  "camera", "climate", "cover", "device_tracker", "fan", "group", "humidifier",
  "input_boolean", "light", "lock", "media_player", "person", "plant",
  "remote", "schedule", "script", "siren", "sun", "switch", "timer",
  "update", "vacuum",
];

/* ---------------------------------------------------------------------- */
/* Minimal flat-YAML helpers (no external deps)                           */
/* ---------------------------------------------------------------------- */

// Builds a theme YAML block. `modeValues` is optional: { light: {...}, dark: {...} }.
// Mode-independent (base) vars are written at the top level; only fields the
// user actually touched in a given mode are written under `modes:`. Any key
// present in `values`/mode overrides that ISN'T one of our ~73 known fields
// (e.g. a custom state-light-on-color entry) is still emitted - see the
// Custom Variables section, which writes directly into the same store.
function buildYaml(themeName, values, modeValues) {
  const lines = [`${themeName}:`];
  for (const field of ALL_FIELDS) {
    const val = values[field.key];
    if (val === undefined || val === null || val === "") continue;
    lines.push(`  ${field.key}: "${val}"`);
  }
  for (const [key, val] of Object.entries(values)) {
    if (KNOWN_FIELD_KEYS.has(key) || !val) continue;
    lines.push(`  ${key}: "${val}"`);
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
      for (const [key, val] of Object.entries(light)) {
        if (KNOWN_FIELD_KEYS.has(key) || !val) continue;
        lines.push(`      ${key}: "${val}"`);
      }
    }
    if (hasDark) {
      lines.push(`    dark:`);
      for (const field of ALL_FIELDS) {
        const val = dark[field.key];
        if (val) lines.push(`      ${field.key}: "${val}"`);
      }
      for (const [key, val] of Object.entries(dark)) {
        if (KNOWN_FIELD_KEYS.has(key) || !val) continue;
        lines.push(`      ${key}: "${val}"`);
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

// Dashboard background animations - a DIFFERENT card-mod injection point
// (card-mod-view, not card-mod-card) since these style the whole view
// behind all cards, not individual cards. Pure CSS, transform/opacity
// driven, colors only via approved theme vars - validated against those
// constraints before being added here (brace balance, no hardcoded hex,
// no filter:blur, no external assets, every animation >= 8s).
const BACKGROUND_ANIMATIONS = [
  {
    id: "phosphor-sweep",
    name: "Phosphor Sweep",
    description: "A bright band slowly travels top to bottom, like a CRT screen refresh.",
  },
  {
    id: "raster-puls",
    name: "Raster Pulse",
    description: "A fine grid gently pulses in opacity, like an instrument on standby.",
  },
  {
    id: "staub-im-licht",
    name: "Dust in Light",
    description: "Soft light patches drift slowly, like dust particles in a sunbeam.",
  },
  {
    id: "planquadrat",
    name: "Blueprint Grid",
    description: "Two grid layers drift at different speeds, like a technical drawing in motion.",
  },
  {
    id: "leiterbahn",
    name: "Circuit Trace",
    description: "A light pulse travels horizontally across a fine circuit-trace pattern.",
  },
  {
    id: "interferenz",
    name: "Interference",
    description: "Two overlaid line grids create a subtle moiré flicker.",
  },
  {
    id: "reaktorring",
    name: "Reactor Ring",
    description: "Concentric rings and a rotating light cone, like a reactor core.",
  },
  {
    id: "peilkreuz",
    name: "Crosshair",
    description: "Rings and a crosshair gently pulse, like a direction-finder on standby.",
  },
  {
    id: "azimut",
    name: "Azimuth",
    description: "A degree ring rotates very slowly, like a radar or compass display.",
  },
  {
    id: "fensterlicht",
    name: "Window Light",
    description: "Soft light breathes gently from one corner, like daylight through a window.",
  },
  {
    id: "leinenzug",
    name: "Linen Weave",
    description: "A fine crosshatch drifts slowly, like the texture of woven linen.",
  },
];

// Raw CSS per background id: keyframes + a class-scoped rule set (the class
// name IS the id, prefixed). Kept class-scoped (not auto-applied) so the
// same block works two ways: (1) theme-wide via card-mod-view + per-view
// `card_mod: class: theme-editor-bg-<id>`, or (2) pasted directly as a
// single view's own `card_mod: style:` block. See _buildBackgroundYaml().
const BACKGROUND_ANIMATION_CSS = {
  "phosphor-sweep": `@keyframes theme-editor-bg-phosphor-sweep {
      0%   { transform: translate3d(0, -120%, 0); }
      100% { transform: translate3d(0, 320%, 0); }
    }
    .theme-editor-bg-phosphor-sweep {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-phosphor-sweep::before {
      content: "";
      position: fixed;
      inset: 0 0 auto 0;
      height: 38vh;
      z-index: -1;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        color-mix(in srgb, var(--primary-color) 16%, transparent) 50%,
        transparent 100%
      );
      animation: theme-editor-bg-phosphor-sweep 22s linear infinite;
      will-change: transform;
    }`,
  "raster-puls": `@keyframes theme-editor-bg-raster-puls {
      0%, 100% { opacity: 0.35; }
      50%      { opacity: 0.95; }
    }
    .theme-editor-bg-raster-puls {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-raster-puls::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-image:
        repeating-linear-gradient(0deg,
          color-mix(in srgb, var(--primary-color) 14%, transparent) 0 1px,
          transparent 1px 32px),
        repeating-linear-gradient(90deg,
          color-mix(in srgb, var(--primary-color) 14%, transparent) 0 1px,
          transparent 1px 32px);
      animation: theme-editor-bg-raster-puls 14s ease-in-out infinite;
      will-change: opacity;
    }`,
  "staub-im-licht": `@keyframes theme-editor-bg-staub-im-licht {
      0%   { transform: translate3d(-2%, 1%, 0) scale(1.04); }
      50%  { transform: translate3d(2%, -2%, 0) scale(1.10); }
      100% { transform: translate3d(-2%, 1%, 0) scale(1.04); }
    }
    .theme-editor-bg-staub-im-licht {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-staub-im-licht::before {
      content: "";
      position: fixed;
      inset: -12%;
      z-index: -1;
      pointer-events: none;
      background-image:
        radial-gradient(circle at 18% 28%, color-mix(in srgb, var(--light-primary-color) 20%, transparent) 0, transparent 26%),
        radial-gradient(circle at 72% 18%, color-mix(in srgb, var(--accent-color) 14%, transparent) 0, transparent 22%),
        radial-gradient(circle at 40% 78%, color-mix(in srgb, var(--primary-color) 16%, transparent) 0, transparent 30%),
        radial-gradient(circle at 88% 66%, color-mix(in srgb, var(--light-primary-color) 12%, transparent) 0, transparent 20%);
      animation: theme-editor-bg-staub-im-licht 40s ease-in-out infinite;
      will-change: transform;
    }`,
  planquadrat: `@keyframes theme-editor-bg-planquadrat-fein {
      0%   { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-48px, -48px, 0); }
    }
    @keyframes theme-editor-bg-planquadrat-grob {
      0%   { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(24px, 24px, 0); }
    }
    .theme-editor-bg-planquadrat {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-planquadrat::before,
    .theme-editor-bg-planquadrat::after {
      content: "";
      position: fixed;
      inset: -64px;
      z-index: -1;
      pointer-events: none;
      will-change: transform;
    }
    .theme-editor-bg-planquadrat::before {
      background-image:
        repeating-linear-gradient(0deg,
          color-mix(in srgb, var(--primary-color) 10%, transparent) 0 1px,
          transparent 1px 24px),
        repeating-linear-gradient(90deg,
          color-mix(in srgb, var(--primary-color) 10%, transparent) 0 1px,
          transparent 1px 24px);
      animation: theme-editor-bg-planquadrat-fein 30s linear infinite;
    }
    .theme-editor-bg-planquadrat::after {
      background-image:
        repeating-linear-gradient(0deg,
          color-mix(in srgb, var(--accent-color) 12%, transparent) 0 1px,
          transparent 1px 120px),
        repeating-linear-gradient(90deg,
          color-mix(in srgb, var(--accent-color) 12%, transparent) 0 1px,
          transparent 1px 120px);
      animation: theme-editor-bg-planquadrat-grob 45s linear infinite;
    }`,
  leiterbahn: `@keyframes theme-editor-bg-leiterbahn {
      0%   { transform: translate3d(-40%, 0, 0); }
      100% { transform: translate3d(140%, 0, 0); }
    }
    .theme-editor-bg-leiterbahn {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-leiterbahn::before,
    .theme-editor-bg-leiterbahn::after {
      content: "";
      position: fixed;
      z-index: -1;
      pointer-events: none;
    }
    .theme-editor-bg-leiterbahn::before {
      inset: 0;
      background-image:
        repeating-linear-gradient(0deg,
          color-mix(in srgb, var(--primary-color) 11%, transparent) 0 2px,
          transparent 2px 56px),
        repeating-linear-gradient(90deg,
          color-mix(in srgb, var(--primary-color) 7%, transparent) 0 2px,
          transparent 2px 140px);
    }
    .theme-editor-bg-leiterbahn::after {
      inset: 0 auto 0 0;
      width: 30vw;
      background: linear-gradient(90deg,
        transparent 0%,
        color-mix(in srgb, var(--accent-color) 22%, transparent) 55%,
        transparent 100%);
      animation: theme-editor-bg-leiterbahn 26s linear infinite;
      will-change: transform;
    }`,
  interferenz: `@keyframes theme-editor-bg-interferenz {
      0%   { transform: rotate(0.6deg) scale(1.08); }
      50%  { transform: rotate(4.2deg) scale(1.08); }
      100% { transform: rotate(0.6deg) scale(1.08); }
    }
    .theme-editor-bg-interferenz {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-interferenz::before,
    .theme-editor-bg-interferenz::after {
      content: "";
      position: fixed;
      inset: -25%;
      z-index: -1;
      pointer-events: none;
    }
    .theme-editor-bg-interferenz::before {
      background-image: repeating-linear-gradient(0deg,
        color-mix(in srgb, var(--primary-color) 9%, transparent) 0 1px,
        transparent 1px 8px);
    }
    .theme-editor-bg-interferenz::after {
      background-image: repeating-linear-gradient(0deg,
        color-mix(in srgb, var(--light-primary-color) 9%, transparent) 0 1px,
        transparent 1px 8px);
      animation: theme-editor-bg-interferenz 36s ease-in-out infinite;
      will-change: transform;
    }`,
  reaktorring: `@keyframes theme-editor-bg-reaktorring-ringe {
      0%   { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes theme-editor-bg-reaktorring-sweep {
      0%   { transform: rotate(360deg); }
      100% { transform: rotate(0deg); }
    }
    .theme-editor-bg-reaktorring {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-reaktorring::before,
    .theme-editor-bg-reaktorring::after {
      content: "";
      position: fixed;
      inset: -40vmax;
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      will-change: transform;
    }
    .theme-editor-bg-reaktorring::before {
      background-image: repeating-radial-gradient(circle at 50% 50%,
        transparent 0 46px,
        color-mix(in srgb, var(--primary-color) 13%, transparent) 46px 47px,
        transparent 47px 92px);
      animation: theme-editor-bg-reaktorring-ringe 90s linear infinite;
    }
    .theme-editor-bg-reaktorring::after {
      background-image: conic-gradient(from 0deg,
        transparent 0deg 300deg,
        color-mix(in srgb, var(--accent-color) 16%, transparent) 340deg,
        transparent 360deg);
      animation: theme-editor-bg-reaktorring-sweep 28s linear infinite;
    }`,
  peilkreuz: `@keyframes theme-editor-bg-peilkreuz {
      0%, 100% { transform: scale(1); opacity: 0.55; }
      50%      { transform: scale(1.06); opacity: 1; }
    }
    .theme-editor-bg-peilkreuz {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-peilkreuz::before {
      content: "";
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-image:
        radial-gradient(circle at 50% 50%,
          transparent 0 22vmin,
          color-mix(in srgb, var(--primary-color) 15%, transparent) 22vmin calc(22vmin + 1px),
          transparent calc(22vmin + 1px) 100%),
        radial-gradient(circle at 50% 50%,
          transparent 0 30vmin,
          color-mix(in srgb, var(--primary-color) 9%, transparent) 30vmin calc(30vmin + 2px),
          transparent calc(30vmin + 2px) 100%),
        linear-gradient(90deg, transparent calc(50% - 0.5px),
          color-mix(in srgb, var(--accent-color) 12%, transparent) calc(50% - 0.5px) calc(50% + 0.5px),
          transparent calc(50% + 0.5px)),
        linear-gradient(0deg, transparent calc(50% - 0.5px),
          color-mix(in srgb, var(--accent-color) 12%, transparent) calc(50% - 0.5px) calc(50% + 0.5px),
          transparent calc(50% + 0.5px));
      animation: theme-editor-bg-peilkreuz 20s ease-in-out infinite;
      will-change: transform, opacity;
    }`,
  azimut: `@keyframes theme-editor-bg-azimut {
      0%   { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    .theme-editor-bg-azimut {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-azimut::before {
      content: "";
      position: fixed;
      left: 50%;
      top: 50%;
      width: 60vmin;
      height: 60vmin;
      border-radius: 50%;
      z-index: -1;
      pointer-events: none;
      background-image:
        repeating-conic-gradient(from 0deg at 50% 50%,
          color-mix(in srgb, var(--primary-color) 20%, transparent) 0deg 0.5deg,
          transparent 0.5deg 6deg),
        radial-gradient(circle at 50% 50%,
          transparent 0 29.4%,
          color-mix(in srgb, var(--accent-color) 20%, transparent) 29.4% 30%,
          transparent 30% 40%,
          color-mix(in srgb, var(--accent-color) 14%, transparent) 40% 40.5%,
          transparent 40.5% 100%);
      -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 0 30%, #000 32% 39%, transparent 40.5%);
      mask-image: radial-gradient(circle at 50% 50%, transparent 0 30%, #000 32% 39%, transparent 40.5%);
      animation: theme-editor-bg-azimut 120s linear infinite;
      will-change: transform;
    }`,
  fensterlicht: `@keyframes theme-editor-bg-fensterlicht {
      0%, 100% { transform: scale(1) translate3d(0, 0, 0); opacity: 0.55; }
      50%      { transform: scale(1.18) translate3d(2%, -1%, 0); opacity: 1; }
    }
    .theme-editor-bg-fensterlicht {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-fensterlicht::before {
      content: "";
      position: fixed;
      inset: -20%;
      z-index: -1;
      pointer-events: none;
      transform-origin: 22% 12%;
      background: radial-gradient(ellipse 70% 60% at 22% 12%,
        color-mix(in srgb, var(--accent-color) 18%, transparent) 0%,
        color-mix(in srgb, var(--primary-color) 8%, transparent) 45%,
        transparent 72%);
      animation: theme-editor-bg-fensterlicht 34s ease-in-out infinite;
      will-change: transform, opacity;
    }`,
  leinenzug: `@keyframes theme-editor-bg-leinenzug {
      0%   { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-56px, -32px, 0); }
    }
    .theme-editor-bg-leinenzug {
      position: relative;
      background: var(--primary-background-color);
    }
    .theme-editor-bg-leinenzug::before {
      content: "";
      position: fixed;
      inset: -64px;
      z-index: -1;
      pointer-events: none;
      background-image:
        repeating-linear-gradient(58deg,
          color-mix(in srgb, var(--primary-color) 8%, transparent) 0 1px,
          transparent 1px 7px),
        repeating-linear-gradient(148deg,
          color-mix(in srgb, var(--dark-primary-color) 6%, transparent) 0 1px,
          transparent 1px 9px);
      animation: theme-editor-bg-leinenzug 38s linear infinite;
      will-change: transform;
    }`,
};

function buildBackgroundYaml(backgroundId) {
  if (!backgroundId || backgroundId === "none" || !BACKGROUND_ANIMATION_CSS[backgroundId]) return "";
  const css = BACKGROUND_ANIMATION_CSS[backgroundId];
  const lines = [];
  lines.push(`# Separate injection point - do NOT merge into card-mod-card above.`);
  lines.push(`# Two ways to use this:`);
  lines.push(`#`);
  lines.push(`# A) Theme-wide, opt-in per view: paste the whole block below into your theme`);
  lines.push(`#    file under "card-mod-view:", then on any view you want animated, add:`);
  lines.push(`#      card_mod:`);
  lines.push(`#        class: theme-editor-bg-${backgroundId}`);
  lines.push(`#`);
  lines.push(`# B) Single view only, no theme change: open that view's raw config and add`);
  lines.push(`#    directly (skip the "card-mod-view:" line, keep everything after it):`);
  lines.push(`#      card_mod:`);
  lines.push(`#        style: |`);
  lines.push(`#          <the CSS below, with .theme-editor-bg-${backgroundId} replaced by :host>`);
  lines.push(`card-mod-view: |`);
  for (const line of css.split("\n")) {
    lines.push(`  ${line}`);
  }
  return lines.join("\n") + "\n";
}


const DEFAULT_ADVANCED_STATE = {
  variant: "elevated",
  toggleStyle: "default",
  animations: { hoverElevate: true, glowPulse: false, shimmer: false, rotatingBorder: false, ripple: false },
  transitionMs: 200,
  background: "none",
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
// selector. All five (including hover-elevate, folded in here as of v2.0.0
// so every combinable animation lives in one place/one checkbox grid) are
// independent of the card variant/shape, so any combination can be layered.
function buildAnimationBlocks(selector, animations) {
  const blocks = [];
  if (animations.hoverElevate) {
    blocks.push(
      `${selector}:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(0,0,0,0.4); }`
    );
  }
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
// .mockup-card instead of ha-card, using the exact same variant/animation
// logic as buildCardModSnippet.
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

/* ---------------------------------------------------------------------- */
/* Section navigation (Advanced first, then one entry per FIELD_GROUPS)   */
/* ---------------------------------------------------------------------- */

const SECTIONS = [
  { id: "advanced", label: "Advanced", isAdvanced: true },
  ...FIELD_GROUPS.map((g) => ({ id: g.id, label: g.label, hint: g.hint, fields: g.fields })),
  { id: "custom", label: "Custom Variables", isCustom: true },
];

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
    this._previewDevice = "tablet"; // "mobile" (300) | "tablet" (380) | "wallpanel" (400)
    this._advanced = { ...DEFAULT_ADVANCED_STATE, animations: { ...DEFAULT_ADVANCED_STATE.animations } };
    this._themeName = "my_custom_theme";
    this._activeSection = "advanced";
    this._yamlTab = "vars"; // "vars" | "card" | "background"
    this._dirtyCount = 0;
    this._navMobileOpen = false; // <1024px: preview becomes a collapsible panel
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
    return 16;
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
        this._previewDevice = parsed.previewDevice || "tablet";
        this._activeSection = parsed.activeSection || "advanced";
        // Merge with defaults so older localStorage snapshots (pre-v2, or
        // pre-toggleStyle/animations) don't crash on missing fields. Also
        // migrates a legacy top-level `hoverElevate` flag (v1.x) into the
        // v2.0.0 animations object if present.
        const savedAdvanced = parsed.advanced || {};
        const savedAnimations = savedAdvanced.animations || {};
        this._advanced = {
          ...DEFAULT_ADVANCED_STATE,
          ...savedAdvanced,
          animations: {
            ...DEFAULT_ADVANCED_STATE.animations,
            ...(savedAdvanced.hoverElevate !== undefined ? { hoverElevate: savedAdvanced.hoverElevate } : {}),
            ...savedAnimations,
          },
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
          activeSection: this._activeSection,
          advanced: this._advanced,
        })
      );
    } catch (e) {
      // storage full / unavailable - non-fatal
    }
  }

  _markDirty() {
    this._dirtyCount++;
    this._saveToStorage();
    const el = this.shadowRoot.getElementById("dirty-counter");
    if (el) {
      el.textContent = this._dirtyCount === 1 ? "1 unsaved change" : `${this._dirtyCount} unsaved changes`;
      el.style.display = "";
    }
  }

  /* ---------------- shared var helpers ---------------- */

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
    const frame = this.shadowRoot.getElementById("preview-frame");
    if (!frame) return;
    this._applyVarsToElement(frame, this._computeEffectiveVars());
  }

  _applyAdvancedPreview() {
    const frame = this.shadowRoot.getElementById("preview-frame");
    if (!frame) return;
    let styleEl = frame.querySelector(".adv-preview-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.className = "adv-preview-style";
      frame.appendChild(styleEl);
    }
    styleEl.textContent = buildPreviewAdvancedCss(this._advanced);
  }

  _applyBackgroundPreview(target) {
    const el = target || this.shadowRoot.getElementById("preview-frame");
    if (!el) return;
    for (const cls of [...el.classList]) {
      if (cls.startsWith("theme-editor-bg-")) el.classList.remove(cls);
    }
    let styleEl = el.querySelector(".bg-preview-style");
    const bgId = this._advanced.background;
    const css = bgId && BACKGROUND_ANIMATION_CSS[bgId];
    if (!css) {
      if (styleEl) styleEl.textContent = "";
      return;
    }
    el.classList.add(`theme-editor-bg-${bgId}`);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.className = "bg-preview-style";
      el.appendChild(styleEl);
    }
    styleEl.textContent = css;
  }

  _escAttr(str) {
    return String(str).replace(/"/g, "&quot;");
  }

  // Robust clipboard copy: the modern navigator.clipboard API silently
  // throws (or is entirely undefined) outside a "secure context" - e.g.
  // Home Assistant served over plain HTTP/LAN IP without HTTPS set up yet,
  // or inside certain embeds. Falls back to the older execCommand approach
  // via a temporary textarea, which works over HTTP too. Returns true/false
  // so callers can show real success/failure feedback instead of guessing.
  async _copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {
        // fall through to legacy fallback below
      }
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  /* ---------------- rendering ---------------- */

  _render() {
    const root = this.shadowRoot;
    root.innerHTML = `
      <style>${this._css()}</style>
      <ha-card>
        <div class="te-root">
          ${this._topbarHtml()}
          <div class="te-workspace">
            ${this._navHtml()}
            <div class="te-content" id="te-content">
              <button class="te-preview-toggle" id="te-preview-toggle">${this._navMobileOpen ? "▴ Hide preview" : "▾ Show preview"}</button>
              ${this._contentHtml()}
            </div>
            ${this._previewColumnHtml()}
          </div>
        </div>
      </ha-card>
    `;
    this._applyPreviewVars();
    this._applyAdvancedPreview();
    this._applyBackgroundPreview();
    this._bindEvents();
  }

  _topbarHtml() {
    const modes = [
      { id: null, label: "Both" },
      { id: "light", label: "Light" },
      { id: "dark", label: "Dark" },
    ];
    return `
      <div class="te-topbar">
        <div class="te-brand">Theme Editor</div>
        <div class="te-vdiv"></div>
        <div class="te-name-field">
          <span class="te-label-inline">Name</span>
          <input id="theme-name" type="text" value="${this._escAttr(this._themeName)}" placeholder="my_custom_theme" />
        </div>
        <div class="te-seg" id="mode-seg">
          ${modes
            .map(
              (m) => `<button data-mode="${m.id || ""}" class="${this._activeMode === m.id ? "on" : ""}">${m.label}</button>`
            )
            .join("")}
        </div>
        <div class="te-spacer"></div>
        <span class="te-dirty" id="dirty-counter" style="${this._dirtyCount ? "" : "display:none"}">${
      this._dirtyCount === 1 ? "1 unsaved change" : `${this._dirtyCount} unsaved changes`
    }</span>
        <button class="te-btn" id="btn-presets">Presets</button>
        <button class="te-btn" id="btn-import">Import</button>
        <button class="te-btn te-btn-danger" id="btn-reset">Reset</button>
        <div class="te-vdiv"></div>
        <button class="te-btn te-btn-accent" id="btn-yaml-toggle">YAML</button>
        <button class="te-btn te-btn-primary" id="btn-save">Save</button>
      </div>
    `;
  }

  _navHtml() {
    return `
      <div class="te-nav">
        <div class="te-nav-label">Sections</div>
        ${SECTIONS.map((s) => {
          const on = s.id === this._activeSection;
          const count = s.isAdvanced ? "card-mod" : s.isCustom ? String(this._customVarCount()) : String(s.fields.length);
          return `
            <button class="te-nav-row ${on ? "on" : ""}" data-section="${s.id}">
              <span class="te-nav-marker"></span>
              <span class="te-nav-label-text">${s.label}</span>
              <span class="te-nav-count">${count}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  _customVarCount() {
    const store = this._activeStore();
    return Object.keys(store).filter((k) => !KNOWN_FIELD_KEYS.has(k)).length;
  }

  _contentHtml() {
    const s = SECTIONS.find((x) => x.id === this._activeSection) || SECTIONS[0];
    const count = s.isAdvanced ? "3 groups" : s.isCustom ? `${this._customVarCount()} set` : `${s.fields.length} fields`;
    const hint = s.isAdvanced
      ? "Shapes, animations, and backgrounds need card-mod. Changes apply instantly in the preview to the right; open the YAML popup (topbar) to export."
      : s.isCustom
      ? "Anything not covered by the sections above - most commonly per-entity state colors (state-{domain}-{device_class}-{state}-color), which Home Assistant supports for a large, open-ended set of domains/states/device classes that don't fit as fixed fields. See the quick-add helper below, or type any variable name directly."
      : s.hint;
    return `
      <div class="te-content-inner">
        <div class="te-content-head">
          <h2>${s.label}</h2>
          <span class="te-content-count">${count}</span>
        </div>
        <div class="te-content-hint">${hint}</div>
        ${s.isAdvanced ? this._advancedContentHtml() : s.isCustom ? this._customVarsContentHtml() : this._fieldsGridHtml(s.fields)}
      </div>
    `;
  }

  _fieldsGridHtml(fields) {
    const store = this._activeStore();
    return `
      <div class="te-field-grid">
        ${fields.map((f) => this._fieldRowHtml(f, store)).join("")}
      </div>
    `;
  }

  _fieldRowHtml(field, store) {
    const val = store[field.key] ?? "";
    const isOverride = !!this._activeMode && val !== "";
    const inheritedDisplay = this._activeMode ? this._values[field.key] || field.default : field.default;
    const clearBtn = `<button class="te-field-clear ${isOverride ? "" : "hidden"}" data-clear="${field.key}" title="Clear override, inherit base">✕</button>`;

    if (field.type === "color") {
      const swatchVal = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val)
        ? val
        : /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(inheritedDisplay)
        ? inheritedDisplay
        : field.default;
      return `
        <div class="te-field-row">
          <input type="color" class="te-swatch" data-key="${field.key}" value="${swatchVal}" title="${field.label}" />
          <div class="te-field-names">
            <div class="te-field-label">${field.label}</div>
            <div class="te-field-key">${field.key}</div>
          </div>
          <input type="text" class="te-field-hex" data-key="${field.key}" value="${this._escAttr(val)}" placeholder="${inheritedDisplay}" />
          ${clearBtn}
        </div>
      `;
    }
    return `
      <div class="te-field-row">
        <div class="te-swatch te-unit-box">${field.unit || "px"}</div>
        <div class="te-field-names">
          <div class="te-field-label">${field.label}</div>
          <div class="te-field-key">${field.key}</div>
        </div>
        <input type="text" class="te-field-hex te-field-text" data-key="${field.key}" value="${this._escAttr(val)}" placeholder="${inheritedDisplay}" />
        ${clearBtn}
      </div>
    `;
  }

  _advancedContentHtml() {
    const a = this._advanced;
    const animList = [
      { key: "hoverElevate", label: "Hover Elevate" },
      { key: "glowPulse", label: "Glow Pulse" },
      { key: "shimmer", label: "Shimmer Sweep" },
      { key: "rotatingBorder", label: "Rotating Border" },
      { key: "ripple", label: "Press Flash" },
    ];
    return `
      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Card Shape</div>
          <span class="te-adv-block-note">global default</span>
        </div>
        <div class="te-shape-grid">
          ${Object.entries(CARD_VARIANT_LABELS)
            .filter(([key]) => key !== "none")
            .map(([key, label]) => {
              const on = a.variant === key;
              const decl = CARD_VARIANT_DECLS[key] || "";
              return `
                <button class="te-shape-tile ${on ? "on" : ""}" data-shape="${key}">
                  <div class="te-shape-chip" style="${decl}"></div>
                  <span>${label.replace(/\s*\(.*\)/, "")}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Toggle / Switch Shape</div>
        </div>
        <div class="te-shape-grid te-shape-grid-4">
          ${Object.entries(TOGGLE_STYLE_LABELS)
            .map(([key, label]) => {
              const on = a.toggleStyle === key;
              return `
                <button class="te-shape-tile te-toggle-tile ${on ? "on" : ""}" data-toggle-style="${key}">
                  <span class="mockup-toggle on toggle-preview-${key}"><span class="knob"></span></span>
                  <span>${label}</span>
                </button>
              `;
            })
            .join("")}
        </div>
      </div>

      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Animations</div>
          <span class="te-adv-block-note">combinable</span>
        </div>
        <div class="te-anim-grid">
          ${animList
            .map((item) => {
              const on = !!a.animations[item.key];
              return `
                <button class="te-anim-tile ${on ? "on" : ""}" data-anim="${item.key}">
                  <span class="te-anim-box">${on ? "✓" : ""}</span>
                  <span>${item.label}</span>
                </button>
              `;
            })
            .join("")}
        </div>
        <div class="te-transition-row">
          <span>Transition speed</span>
          <input type="range" id="adv-ms" min="0" max="600" step="10" value="${a.transitionMs}" />
          <span class="te-transition-val" id="adv-ms-label">${a.transitionMs} ms</span>
        </div>
        <button class="te-btn te-btn-small" id="adv-compare" style="margin-top: 10px;">⇔ Compare shapes</button>
      </div>

      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">View Background</div>
          <span class="te-adv-block-note">card-mod-view</span>
        </div>
        <div class="te-bg-grid">
          <button class="te-bg-tile ${a.background === "none" ? "on" : ""}" data-bg="none">
            <div class="te-bg-stage"></div>
            <span>None</span>
          </button>
          ${BACKGROUND_ANIMATIONS.map((b) => {
            const on = a.background === b.id;
            return `
              <button class="te-bg-tile ${on ? "on" : ""}" data-bg="${b.id}">
                <div class="te-bg-stage theme-editor-bg-${b.id}"></div>
                <span>${b.name}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  _customVarsContentHtml() {
    const store = this._activeStore();
    const entries = Object.entries(store).filter(([k]) => !KNOWN_FIELD_KEYS.has(k));
    return `
      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Quick add: entity state color</div>
          <span class="te-adv-block-note">state-{domain}-{state}-color</span>
        </div>
        <div class="te-content-hint" style="margin-bottom: 12px;">
          Builds a key following Home Assistant's documented pattern:
          <code>state-{domain}-{device_class}-{state}-color</code> (device class
          optional) or <code>state-{domain}-{state}-color</code>. More specific
          keys win over less specific ones.
        </div>
        <div class="te-cv-quickadd">
          <select id="cv-domain">
            ${STATE_COLOR_DOMAINS.map((d) => `<option value="${d}">${d}</option>`).join("")}
          </select>
          <input type="text" id="cv-device-class" placeholder="device_class (optional)" />
          <input type="text" id="cv-state" placeholder="state, e.g. on / open / heating" value="on" />
          <input type="color" id="cv-color" value="#03a9f4" />
          <button class="te-btn te-btn-small" id="cv-add">+ Add</button>
        </div>
      </div>

      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Add any variable</div>
          <span class="te-adv-block-note">for anything not covered above</span>
        </div>
        <div class="te-cv-freeform">
          <input type="text" id="cv-free-key" placeholder="variable-name" />
          <input type="text" id="cv-free-value" placeholder="value" />
          <button class="te-btn te-btn-small" id="cv-free-add">+ Add</button>
        </div>
      </div>

      <div class="te-adv-block">
        <div class="te-adv-block-head">
          <div class="te-adv-block-title">Currently set</div>
          <span class="te-adv-block-note">${entries.length}</span>
        </div>
        ${
          entries.length
            ? `<div class="te-field-grid">${entries.map(([k, v]) => this._customVarRowHtml(k, v)).join("")}</div>`
            : `<div class="te-content-hint">None yet - use one of the add options above.</div>`
        }
      </div>
    `;
  }

  _customVarRowHtml(key, value) {
    const isColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
    return `
      <div class="te-field-row">
        ${
          isColor
            ? `<input type="color" class="te-swatch" data-cv-color="${this._escAttr(key)}" value="${value}" />`
            : `<div class="te-swatch te-unit-box">txt</div>`
        }
        <div class="te-field-names">
          <div class="te-field-label" style="font-family:'IBM Plex Mono',monospace; font-size:11.5px;">${key}</div>
          <div class="te-field-key">custom variable</div>
        </div>
        <input type="text" class="te-field-hex" data-cv-text="${this._escAttr(key)}" value="${this._escAttr(value)}" />
        <button class="te-field-clear" data-cv-remove="${this._escAttr(key)}" title="Remove">✕</button>
      </div>
    `;
  }

  _previewColumnHtml() {
    const devices = [
      { id: "mobile", label: "Phone" },
      { id: "tablet", label: "Tablet" },
      { id: "wallpanel", label: "Wall Panel" },
    ];
    return `
      <div class="te-preview-col ${this._navMobileOpen ? "open" : ""}" id="te-preview-col">
        <div class="te-preview-head">
          <span class="te-preview-label">Live Preview</span>
          <div class="te-seg" id="device-seg">
            ${devices.map((d) => `<button data-device="${d.id}" class="${this._previewDevice === d.id ? "on" : ""}">${d.label}</button>`).join("")}
          </div>
        </div>
        <div class="te-preview-body">
          <div class="te-preview-frame" id="preview-frame" style="width: ${this._deviceWidth()}px;">
            ${this._previewFrameInnerHtml()}
          </div>
        </div>
        <div class="te-preview-foot">
          <button class="te-btn" id="btn-full-preview">Fullscreen</button>
          <button class="te-btn" id="btn-compare-shapes">Compare shapes</button>
        </div>
      </div>
    `;
  }

  _deviceWidth() {
    return { mobile: 300, tablet: 380, wallpanel: 400 }[this._previewDevice] || 380;
  }

  _previewFrameInnerHtml() {
    return `
      <div class="pf-header">
        <div class="pf-header-left"><span class="pf-dot"></span>Overview</div>
        <span class="pf-header-right">Rooms · Settings</span>
      </div>
      <div class="pf-body">
        <div class="mockup-card">
          <div class="pf-row">
            <div>
              <div class="pf-title">Living Room Light</div>
              <div class="pf-sub">On · 62%</div>
            </div>
            <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
          </div>
        </div>
        <div class="mockup-card">
          <div class="pf-title">Temperature</div>
          <div class="pf-big">21.4°C</div>
          <div class="mockup-slider"><span class="mockup-slider-fill" style="width:62%"></span></div>
        </div>
        <div class="pf-badges">
          <span class="mockup-badge success">Normal</span>
          <span class="mockup-badge warning">Warning</span>
          <span class="mockup-badge error">Error</span>
        </div>
      </div>
    `;
  }

  _yamlTabText(tab) {
    if (tab === "card") return buildCardModSnippet(this._themeName, this._advanced);
    if (tab === "background") {
      return (
        buildBackgroundYaml(this._advanced.background) ||
        "# No background animation selected.\n# Pick one under Advanced → View Background."
      );
    }
    return buildYaml(this._themeName, this._values, this._modeValues);
  }

  _openYamlDialog() {
    const existing = this.shadowRoot.getElementById("yaml-overlay");
    if (existing) existing.remove();

    const tabs = [
      { id: "vars", label: "Variables" },
      { id: "card", label: "Card Shape" },
      { id: "background", label: "Background" },
    ];

    const overlay = document.createElement("div");
    overlay.id = "yaml-overlay";
    overlay.className = "te-overlay";
    overlay.innerHTML = `
      <div class="te-dialog te-dialog-yaml">
        <button class="te-btn te-btn-icon te-yaml-close-fixed" id="yaml-close" title="Close" aria-label="Close">✕</button>
        <div class="te-yaml-head">
          <div class="te-seg" id="yaml-tab-seg">
            ${tabs.map((t) => `<button data-yaml-tab="${t.id}" class="${this._yamlTab === t.id ? "on" : ""}">${t.label}</button>`).join("")}
          </div>
          <div class="te-spacer"></div>
          <a class="te-yaml-guide-link" href="https://github.com/Okcuoglu/homeassistant-theme-editor/blob/main/YAML-GUIDE.md" target="_blank" rel="noopener">How do I use this? ↗</a>
          <button class="te-btn te-btn-small" id="yaml-copy">Copy</button>
          <button class="te-btn te-btn-small" id="yaml-download">Load .yaml</button>
        </div>
        <pre class="te-yaml-code" id="yaml-code">${this._escHtml(this._yamlTabText(this._yamlTab))}</pre>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    const refresh = () => {
      overlay.querySelector("#yaml-code").textContent = this._yamlTabText(this._yamlTab);
      overlay.querySelectorAll("#yaml-tab-seg button").forEach((btn) => {
        btn.classList.toggle("on", btn.dataset.yamlTab === this._yamlTab);
      });
    };

    overlay.querySelectorAll("#yaml-tab-seg button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._yamlTab = btn.dataset.yamlTab;
        refresh();
      });
    });

    const yamlCopyBtn = overlay.querySelector("#yaml-copy");
    yamlCopyBtn.addEventListener("click", async () => {
      const text = overlay.querySelector("#yaml-code").textContent;
      const ok = await this._copyToClipboard(text);
      yamlCopyBtn.textContent = ok ? "Copied!" : "Copy failed - select manually";
      if (!ok) {
        const range = document.createRange();
        range.selectNodeContents(overlay.querySelector("#yaml-code"));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      setTimeout(() => {
        if (overlay.querySelector("#yaml-copy")) overlay.querySelector("#yaml-copy").textContent = "Copy";
      }, ok ? 1500 : 3000);
    });

    overlay.querySelector("#yaml-download").addEventListener("click", () => {
      const text = overlay.querySelector("#yaml-code").textContent;
      const suffix = this._yamlTab === "card" ? "-card-mod" : this._yamlTab === "background" ? "-background" : "";
      const blob = new Blob([text], { type: "text/yaml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${this._themeName || "theme"}${suffix}.yaml`;
      a.click();
      URL.revokeObjectURL(url);
    });

    overlay.querySelector("#yaml-close").addEventListener("click", () => overlay.remove());
  }

  _escHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------------- events ---------------- */

  _bindEvents() {
    const root = this.shadowRoot;

    // Topbar
    root.getElementById("theme-name").addEventListener("input", (e) => {
      this._themeName = e.target.value || "my_custom_theme";
      this._markDirty();
    });
    root.querySelectorAll("#mode-seg button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._activeMode = btn.dataset.mode || null;
        this._render();
      });
    });
    root.getElementById("btn-presets").addEventListener("click", () => this._openPresetsDialog());
    root.getElementById("btn-import").addEventListener("click", () => this._openImportDialog());
    root.getElementById("btn-reset").addEventListener("click", () => {
      if (!confirm("Reset all fields (base, light, dark, advanced) and start a new blank theme?")) return;
      this._values = {};
      this._modeValues = { light: {}, dark: {} };
      this._activeMode = null;
      this._themeName = "my_custom_theme";
      this._previewDevice = "tablet";
      this._advanced = { ...DEFAULT_ADVANCED_STATE, animations: { ...DEFAULT_ADVANCED_STATE.animations } };
      this._dirtyCount = 0;
      this._saveToStorage();
      this._render();
    });
    root.getElementById("btn-yaml-toggle").addEventListener("click", () => {
      this._openYamlDialog();
    });
    root.getElementById("btn-save").addEventListener("click", () => {
      this._dirtyCount = 0;
      this._saveToStorage();
      const btn = root.getElementById("btn-save");
      const original = btn.textContent;
      btn.textContent = "Saved!";
      const counter = root.getElementById("dirty-counter");
      if (counter) counter.style.display = "none";
      setTimeout(() => {
        if (root.getElementById("btn-save")) root.getElementById("btn-save").textContent = original;
      }, 1200);
    });

    // Nav
    root.querySelectorAll(".te-nav-row").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._activeSection = btn.dataset.section;
        this._saveToStorage();
        this._render();
      });
    });

    // Field rows (color/text inputs)
    root.querySelectorAll(".te-field-row input[data-key]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.dataset.key;
        const value = e.target.value;
        const store = this._activeStore();
        store[key] = value;
        this._applyPreviewVars();
        this._markDirty();
        root.querySelectorAll(`input[data-key="${key}"]`).forEach((other) => {
          if (other !== e.target) other.value = value;
        });
        const clearBtn = e.target.closest(".te-field-row")?.querySelector(".te-field-clear");
        if (clearBtn) clearBtn.classList.toggle("hidden", !this._activeMode || value === "");
      });
    });
    root.querySelectorAll("[data-clear]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.clear;
        delete this._activeStore()[key];
        this._applyPreviewVars();
        this._markDirty();
        this._render();
      });
    });

    // Advanced: shapes
    root.querySelectorAll("[data-shape]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._advanced.variant = btn.dataset.shape;
        this._markDirty();
        this._render();
      });
    });
    root.querySelectorAll("[data-toggle-style]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._advanced.toggleStyle = btn.dataset.toggleStyle;
        this._markDirty();
        this._render();
      });
    });
    root.querySelectorAll("[data-anim]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.anim;
        this._advanced.animations[key] = !this._advanced.animations[key];
        this._markDirty();
        this._render();
      });
    });
    const msSlider = root.getElementById("adv-ms");
    if (msSlider) {
      msSlider.addEventListener("input", (e) => {
        this._advanced.transitionMs = parseInt(e.target.value, 10);
        root.getElementById("adv-ms-label").textContent = `${this._advanced.transitionMs} ms`;
        this._applyAdvancedPreview();
        this._markDirty();
      });
    }
    const compareBtn = root.getElementById("adv-compare");
    if (compareBtn) compareBtn.addEventListener("click", () => this._openVariantGalleryDialog());
    root.querySelectorAll("[data-bg]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._advanced.background = btn.dataset.bg;
        this._markDirty();
        this._render();
      });
    });

    // Custom Variables section
    const cvAddBtn = root.getElementById("cv-add");
    if (cvAddBtn) {
      cvAddBtn.addEventListener("click", () => {
        const domain = root.getElementById("cv-domain").value;
        const deviceClass = root.getElementById("cv-device-class").value.trim();
        const state = root.getElementById("cv-state").value.trim() || "on";
        const color = root.getElementById("cv-color").value;
        const key = deviceClass ? `state-${domain}-${deviceClass}-${state}-color` : `state-${domain}-${state}-color`;
        this._activeStore()[key] = color;
        this._markDirty();
        this._render();
      });
    }
    const cvFreeAddBtn = root.getElementById("cv-free-add");
    if (cvFreeAddBtn) {
      cvFreeAddBtn.addEventListener("click", () => {
        const key = root.getElementById("cv-free-key").value.trim();
        const value = root.getElementById("cv-free-value").value.trim();
        if (!key || !value) return;
        this._activeStore()[key] = value;
        this._markDirty();
        this._render();
      });
    }
    root.querySelectorAll("[data-cv-color]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.dataset.cvColor;
        this._activeStore()[key] = e.target.value;
        this._markDirty();
        root.querySelectorAll("[data-cv-text]").forEach((textInput) => {
          if (textInput.dataset.cvText === key) textInput.value = e.target.value;
        });
      });
    });
    root.querySelectorAll("[data-cv-text]").forEach((input) => {
      input.addEventListener("input", (e) => {
        const key = e.target.dataset.cvText;
        this._activeStore()[key] = e.target.value;
        this._markDirty();
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(e.target.value)) {
          root.querySelectorAll("[data-cv-color]").forEach((colorInput) => {
            if (colorInput.dataset.cvColor === key) colorInput.value = e.target.value;
          });
        }
      });
    });
    root.querySelectorAll("[data-cv-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        delete this._activeStore()[btn.dataset.cvRemove];
        this._markDirty();
        this._render();
      });
    });

    // Preview column
    root.querySelectorAll("#device-seg button").forEach((btn) => {
      btn.addEventListener("click", () => {
        this._previewDevice = btn.dataset.device;
        this._saveToStorage();
        this._render();
      });
    });
    const fullPreviewBtn = root.getElementById("btn-full-preview");
    if (fullPreviewBtn) fullPreviewBtn.addEventListener("click", () => this._openFullPreviewDialog());
    const compareShapesBtn = root.getElementById("btn-compare-shapes");
    if (compareShapesBtn) compareShapesBtn.addEventListener("click", () => this._openVariantGalleryDialog());

    // <1024px: preview becomes a collapsible panel, toggled by a button CSS
    // only shows at that width (see _css() .te-preview-toggle media rule)
    const previewToggle = root.getElementById("te-preview-toggle");
    if (previewToggle) {
      previewToggle.addEventListener("click", () => {
        this._navMobileOpen = !this._navMobileOpen;
        this._render();
      });
    }
  }

  /* ---------------- dialogs ---------------- */

  _openPresetsDialog() {
    const existing = this.shadowRoot.getElementById("presets-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "presets-overlay";
    overlay.className = "te-overlay";
    overlay.innerHTML = `
      <div class="te-dialog">
        <div class="te-dialog-title-row">
          <div class="te-dialog-title">Starter presets</div>
          <button class="te-btn te-btn-icon" id="presets-close">✕</button>
        </div>
        <div class="te-dialog-sub">Loading a preset replaces your current base colors (Light/Dark overrides are kept). Export first if you want to keep your current work.</div>
        <div class="te-preset-list">
          ${PRESETS.map(
            (p) => `
            <div class="te-preset-item">
              <div class="te-preset-swatches">
                ${["primary-color", "primary-background-color", "card-background-color", "accent-color"]
                  .map((k) => `<span class="te-preset-swatch" style="background:${p.values[k] || "#333"}"></span>`)
                  .join("")}
              </div>
              <div class="te-preset-info">
                <div class="te-preset-name">${p.name}</div>
                <div class="te-preset-desc">${p.description}</div>
              </div>
              <button class="te-btn te-btn-small" data-preset="${p.id}">Load</button>
            </div>
          `
          ).join("")}
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    overlay.querySelector("#presets-close").addEventListener("click", () => overlay.remove());
    overlay.querySelectorAll("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
        if (!preset) return;
        this._values = { ...preset.values };
        this._themeName = preset.id.replace(/-/g, "_");
        this._activeMode = null;
        this._markDirty();
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
    overlay.className = "te-overlay";
    overlay.innerHTML = `
      <div class="te-dialog">
        <div class="te-dialog-title-row">
          <div class="te-dialog-title">Import theme YAML</div>
          <button class="te-btn te-btn-icon" id="import-close">✕</button>
        </div>
        <div class="te-dialog-sub">Paste a Home Assistant theme block - flat or with a "modes: light: / dark:" section.</div>
        <textarea id="import-text" rows="10" placeholder="my_theme:&#10;  primary-color: &quot;#03a9f4&quot;&#10;  ..."></textarea>
        <div class="te-dialog-actions">
          <button class="te-btn" id="import-cancel">Cancel</button>
          <button class="te-btn te-btn-primary" id="import-apply">Apply</button>
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector("#import-close").addEventListener("click", close);
    overlay.querySelector("#import-cancel").addEventListener("click", close);
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
      this._markDirty();
      overlay.remove();
      this._render();
    });
  }

  _openVariantGalleryDialog() {
    const existing = this.shadowRoot.getElementById("variant-gallery-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "variant-gallery-overlay";
    overlay.className = "te-overlay";
    overlay.innerHTML = `
      <div class="te-dialog te-dialog-wide">
        <div class="te-dialog-title-row">
          <div class="te-dialog-title">Compare Shapes</div>
          <button class="te-btn te-btn-icon" id="vg-close">✕</button>
        </div>
        <div class="te-dialog-sub">
          All ${Object.keys(CARD_VARIANT_LABELS).length - 1} card shapes side by side, with your
          current animations and colors applied. Click a card's name to copy its
          <code>card_mod: class: ...</code> value.
        </div>
        <div class="te-gallery-grid">
          ${Object.entries(CARD_VARIANT_LABELS)
            .filter(([key]) => key !== "none")
            .map(([key, label]) => {
              const className = key === "glass" ? "glass-holo" : key;
              return `
              <div class="mockup-card vg-card" style="${CARD_VARIANT_DECLS[key]}">
                <div class="pf-title">${label}</div>
                <div class="pf-row" style="margin-top: 8px;">
                  <span class="pf-sub">On/Off</span>
                  <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
                </div>
                <div class="mockup-slider" style="margin-top: 8px;"><span class="mockup-slider-fill" style="width:60%"></span></div>
                <button class="te-vg-copy" data-class="${className}">card_mod: class: ${className}</button>
              </div>
            `;
            })
            .join("")}
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);

    const dialogEl = overlay.querySelector(".te-dialog-wide");
    this._applyVarsToElement(dialogEl, this._computeEffectiveVars());

    const styleTag = document.createElement("style");
    styleTag.textContent = buildAnimationBlocks(".vg-card", this._advanced.animations).join("\n");
    overlay.appendChild(styleTag);

    overlay.querySelector("#vg-close").addEventListener("click", () => overlay.remove());
    overlay.querySelectorAll(".te-vg-copy").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const original = btn.textContent;
        const ok = await this._copyToClipboard(`card_mod:\n  class: ${btn.dataset.class}`);
        btn.textContent = ok ? "Copied!" : "Copy failed - value shown above";
        setTimeout(() => {
          btn.textContent = original;
        }, ok ? 1500 : 3000);
      });
    });
  }

  _openFullPreviewDialog() {
    const existing = this.shadowRoot.getElementById("full-preview-overlay");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "full-preview-overlay";
    overlay.className = "te-overlay";
    overlay.innerHTML = `
      <div class="te-dialog te-dialog-wide">
        <div class="te-dialog-title-row">
          <div class="te-dialog-title">Full Preview</div>
          <div class="te-dialog-title-actions">
            <button class="te-btn te-btn-small" id="fp-refresh">↻ Refresh</button>
            <button class="te-btn te-btn-icon" id="fp-close">✕</button>
          </div>
        </div>
        <div class="te-dialog-sub">
          A snapshot of common Home Assistant card types with your current theme applied.
          Not every possible card exists here, but this covers the most common ones. Hit
          Refresh after editing fields elsewhere to re-sync this snapshot.
        </div>
        <div class="te-gallery-grid" id="fp-grid">
          ${this._fullPreviewCardsHtml()}
        </div>
      </div>
    `;
    this.shadowRoot.appendChild(overlay);
    const dialogEl = overlay.querySelector(".te-dialog-wide");
    this._applyVarsToElement(dialogEl, this._computeEffectiveVars());
    this._applyBackgroundPreview(dialogEl);

    overlay.querySelector("#fp-close").addEventListener("click", () => overlay.remove());
    overlay.querySelector("#fp-refresh").addEventListener("click", () => {
      overlay.querySelector("#fp-grid").innerHTML = this._fullPreviewCardsHtml();
      this._applyVarsToElement(overlay.querySelector(".te-dialog-wide"), this._computeEffectiveVars());
      this._applyBackgroundPreview(overlay.querySelector(".te-dialog-wide"));
    });
  }

  _fullPreviewCardsHtml() {
    return `
      <div class="mockup-card fp-card">
        <div class="pf-title">Living Room Light</div>
        <div class="pf-row" style="margin-top: 8px;">
          <span class="pf-sub">On/Off</span>
          <span class="mockup-toggle adv-toggle on"><span class="knob"></span></span>
        </div>
        <div class="mockup-slider" style="margin-top: 8px;"><span class="mockup-slider-fill" style="width:72%"></span></div>
      </div>

      <div class="mockup-card fp-card fp-thermostat">
        <div class="pf-title">Climate</div>
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
        <div class="pf-title">Weather</div>
        <div class="fp-weather-main">
          <span class="fp-weather-icon">⛅</span>
          <span class="fp-weather-temp">18°</span>
        </div>
        <div class="fp-weather-row">
          <span>Mon 20°</span><span>Tue 17°</span><span>Wed 19°</span><span>Thu 21°</span>
        </div>
      </div>

      <div class="mockup-card fp-card fp-media">
        <div class="pf-title">Living Room Speaker</div>
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
        <div class="pf-title">Temperature History</div>
        <svg class="fp-sparkline" viewBox="0 0 200 60" preserveAspectRatio="none">
          <polyline points="0,40 20,35 40,38 60,20 80,25 100,15 120,22 140,10 160,18 180,12 200,20" fill="none" stroke-width="2" />
        </svg>
        <div class="fp-big-small">21.4°C</div>
      </div>

      <div class="mockup-card fp-card fp-entities">
        <div class="pf-title">Entities</div>
        <div class="fp-entity-row"><span class="fp-entity-icon">💡</span><span class="fp-entity-name">Kitchen Light</span><span class="mockup-toggle adv-toggle on"><span class="knob"></span></span></div>
        <div class="fp-entity-row"><span class="fp-entity-icon">🌡</span><span class="fp-entity-name">Living Room Temp</span><span class="fp-entity-value">21.4°C</span></div>
        <div class="fp-entity-row"><span class="fp-entity-icon">🔒</span><span class="fp-entity-name">Front Door</span><span class="fp-entity-value">Locked</span></div>
      </div>

      <div class="mockup-card fp-card fp-alarm">
        <div class="pf-title">Alarm</div>
        <div class="fp-alarm-status">Armed Home</div>
        <div class="fp-keypad">
          ${["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((n) => `<span class="fp-key">${n}</span>`).join("")}
        </div>
      </div>

      <div class="mockup-card fp-card fp-camera">
        <div class="pf-title">Front Door Camera</div>
        <div class="fp-camera-placeholder">📷</div>
      </div>

      <div class="mockup-card fp-card fp-button-card">
        <div class="fp-button-icon">⏻</div>
        <div class="fp-button-label">Garage Door</div>
      </div>

      <div class="mockup-card fp-card fp-gauge">
        <div class="pf-title">Humidity</div>
        <div class="fp-gauge-ring"><span class="fp-gauge-value">46%</span></div>
      </div>

      <div class="mockup-card fp-card fp-badges">
        <div class="pf-title">Status &amp; Badges</div>
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

  /* ---------------- styles ---------------- */

  _css() {
    return `
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

      :host {
        --te-app: #111a20; --te-surface: #16222a; --te-rail: #0e171d; --te-input: #0f1a20;
        --te-border: #223038; --te-border-str: #22323c; --te-text: #e7edf1; --te-text-2: #9fb2bd;
        --te-text-3: #62798a; --te-accent: #7fb2e5; --te-active-bg: #1b2a34; --te-dirty: #d8b46a;
        display: block;
        height: 100vh;
        font-family: 'IBM Plex Sans', -apple-system, sans-serif;
      }
      * { box-sizing: border-box; }
      ha-card { padding: 0; overflow: hidden; background: var(--te-app); border-radius: 10px; height: 100%; display: flex; flex-direction: column; }

      button { font-family: inherit; cursor: pointer; }
      input { font-family: inherit; }
      :focus-visible { outline: 2px solid var(--te-accent); outline-offset: 1px; }

      ::-webkit-scrollbar { width: 10px; height: 10px; }
      ::-webkit-scrollbar-thumb { background: #2b3439; border-radius: 5px; }
      ::-webkit-scrollbar-track { background: transparent; }

      .te-root {
        container-type: inline-size;
        container-name: te;
        display: grid;
        grid-template-rows: 56px 1fr;
        background: var(--te-app);
        color: var(--te-text);
        flex: 1;
        min-height: 0;
      }

      /* ---------- Topbar ---------- */
      .te-topbar {
        display: flex; align-items: center; gap: 14px; padding: 0 18px; height: 56px;
        background: var(--te-surface); border-bottom: 1px solid var(--te-border-str);
        flex-shrink: 0; overflow-x: auto;
      }
      .te-brand { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
      .te-vdiv { width: 1px; height: 24px; background: var(--te-border-str); flex-shrink: 0; }
      .te-name-field { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
      .te-label-inline { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--te-text-3); white-space: nowrap; }
      .te-name-field input {
        width: 150px; height: 32px; padding: 0 10px; border-radius: 6px;
        border: 1px solid #2c3d47; background: var(--te-input); color: var(--te-text);
        font-family: 'IBM Plex Mono', monospace; font-size: 12.5px;
      }
      .te-spacer { flex: 1; }
      .te-dirty { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--te-dirty); white-space: nowrap; margin-right: 4px; }

      .te-seg { display: flex; background: var(--te-input); border: 1px solid #2c3d47; border-radius: 7px; padding: 2px; gap: 2px; flex-shrink: 0; }
      .te-seg button {
        height: 26px; padding: 0 11px; border-radius: 5px; border: none; background: transparent;
        color: var(--te-text-2); font-size: 12px; white-space: nowrap;
      }
      .te-seg button.on { background: var(--te-accent); color: #0f1c2e; font-weight: 600; }

      .te-btn {
        height: 32px; padding: 0 12px; border-radius: 6px; border: 1px solid #2c3d47;
        background: transparent; color: #c4d3dc; font-size: 12.5px; white-space: nowrap; flex-shrink: 0;
      }
      .te-btn:hover { border-color: #46606f; }
      .te-btn-danger { color: #a4b6c1; }
      .te-btn-danger:hover { border-color: #6d4a4a; color: #e0a49b; }
      .te-btn-accent { border-color: #3a5f7d; color: #9dc4e6; }
      .te-btn-accent:hover { border-color: #5b87ab; }
      .te-btn-primary { border: none; background: var(--te-accent); color: #0f1c2e; font-weight: 600; }
      .te-btn-primary:hover { background: #a3c9ee; }
      .te-btn-small { height: 28px; padding: 0 10px; font-size: 11.5px; border-radius: 5px; }
      .te-btn-icon { width: 28px; height: 28px; padding: 0; font-size: 13px; color: var(--te-text-2); }

      /* ---------- Workspace (nav / content / preview) ---------- */
      .te-workspace { display: flex; min-height: 0; }

      .te-nav {
        width: 178px; flex-shrink: 0; background: var(--te-rail);
        border-right: 1px solid #1e2c34; padding: 12px 8px; overflow-y: auto;
        display: flex; flex-direction: column; gap: 2px;
      }
      .te-nav-label { font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--te-text-3); padding: 4px 10px 8px; }
      .te-nav-row {
        display: flex; align-items: center; gap: 8px; width: 100%; border: none; text-align: left;
        padding: 8px 10px; border-radius: 7px; font-size: 13px; background: transparent; color: var(--te-text-2);
      }
      .te-nav-row.on { background: var(--te-active-bg); color: var(--te-text); font-weight: 600; }
      .te-nav-marker { width: 3px; height: 16px; border-radius: 2px; background: transparent; flex-shrink: 0; }
      .te-nav-row.on .te-nav-marker { background: var(--te-accent); }
      .te-nav-label-text { flex: 1; text-align: left; }
      .te-nav-count { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #5d7382; flex-shrink: 0; }
      .te-nav-row.on .te-nav-count { color: #9dc4e6; }

      .te-content { flex: 1; min-width: 0; overflow-y: auto; padding: 20px 24px 40px; }
      .te-content-inner { max-width: none; }
      .te-content-head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 4px; }
      .te-content-head h2 { font-size: 19px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }
      .te-content-count { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #6d8797; }
      .te-content-hint { font-size: 13px; line-height: 1.55; color: #90a5b2; margin-bottom: 20px; max-width: 620px; }

      .te-field-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px 14px; }

      .te-field-row {
        display: flex; align-items: center; gap: 10px; height: 48px;
        background: var(--te-surface); border: 1px solid var(--te-border); border-radius: 8px; padding: 8px 10px;
      }
      .te-swatch {
        width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0; padding: 0;
        border: 1px solid rgba(255,255,255,.16); background: none; cursor: pointer;
      }
      .te-unit-box {
        display: flex; align-items: center; justify-content: center;
        font-family: 'IBM Plex Mono', monospace; font-size: 9.5px; color: #8aa3bd;
        background: var(--te-input); cursor: default;
      }
      .te-field-names { flex: 1; min-width: 0; }
      .te-field-label { font-size: 12.5px; color: #dbe6ed; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .te-field-key { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: #6d8797; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .te-field-hex {
        width: 84px; height: 30px; padding: 0 8px; border-radius: 5px; flex-shrink: 0;
        border: 1px solid #2c3d47; background: var(--te-input); color: #cfe0ea;
        font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; text-align: center;
      }
      .te-field-text { width: 84px; }
      .te-field-clear {
        border: none; background: transparent; cursor: pointer; flex-shrink: 0;
        color: var(--te-text-3); font-size: 12px; padding: 2px 4px;
      }
      .te-field-clear:hover { color: #e0a49b; }
      .te-field-clear.hidden { visibility: hidden; }

      /* ---------- Advanced blocks ---------- */
      .te-adv-block { margin-bottom: 22px; }
      .te-adv-block-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 10px; }
      .te-adv-block-title { font-size: 13px; font-weight: 600; color: #dbe6ed; }
      .te-adv-block-note { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #6d8797; }

      .te-shape-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
      .te-shape-grid-4 { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
      .te-shape-tile {
        display: flex; flex-direction: column; gap: 8px; align-items: stretch;
        padding: 10px; border-radius: 9px; background: var(--te-surface); border: 1px solid var(--te-border);
        color: var(--te-text-2); font-size: 11.5px; text-align: center; font-family: 'IBM Plex Sans', sans-serif;
      }
      .te-shape-tile.on { background: var(--te-active-bg); border-color: var(--te-accent); color: var(--te-text); }
      .te-shape-chip { height: 34px; background: #182b41; }
      .te-toggle-tile { flex-direction: row; align-items: center; justify-content: center; height: 46px; padding: 6px 10px; gap: 8px; }
      .te-toggle-tile .mockup-toggle { pointer-events: none; }
      .toggle-preview-square, .toggle-preview-square .knob { border-radius: 4px !important; }
      .toggle-preview-sharp, .toggle-preview-sharp .knob { border-radius: 0 !important; }
      .toggle-preview-neon-track { box-shadow: 0 0 8px color-mix(in srgb, var(--primary-color, #7fb2e5) 55%, transparent); }

      .te-anim-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 8px; }
      .te-anim-tile {
        display: flex; align-items: center; gap: 8px; width: 100%; height: 36px;
        padding: 0 10px; border-radius: 7px; font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
        background: var(--te-surface); border: 1px solid var(--te-border); color: var(--te-text-2);
      }
      .te-anim-tile.on { background: var(--te-active-bg); border-color: #3a5f7d; color: var(--te-text); }
      .te-anim-box {
        width: 16px; height: 16px; border-radius: 4px; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center; font-size: 10px;
        background: transparent; color: #0f1c2e; border: 1px solid #3a4b56;
      }
      .te-anim-tile.on .te-anim-box { background: var(--te-accent); border: none; }

      .te-transition-row {
        display: flex; align-items: center; gap: 12px; margin-top: 14px;
        background: var(--te-surface); border: 1px solid var(--te-border); border-radius: 8px; padding: 10px 12px;
      }
      .te-transition-row span:first-child { font-size: 12.5px; color: #dbe6ed; white-space: nowrap; }
      .te-transition-row input[type="range"] { flex: 1; accent-color: var(--te-accent); }
      .te-transition-val { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #9dc4e6; width: 56px; text-align: right; }

      .te-bg-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
      .te-bg-tile {
        display: flex; flex-direction: column; gap: 8px; padding: 8px; border-radius: 9px;
        background: var(--te-surface); border: 1px solid var(--te-border); color: var(--te-text-2);
        font-size: 11.5px; text-align: center; font-family: 'IBM Plex Sans', sans-serif;
      }
      .te-bg-tile.on { background: var(--te-active-bg); border-color: var(--te-accent); color: var(--te-text); }
      .te-bg-stage {
        position: relative; overflow: hidden; height: 52px; border-radius: 5px; background: var(--primary-background-color, #0f1c2e);
        transform: translateZ(0); /* containment for position:fixed inside background CSS - see JS comment */
      }

      /* ---------- Custom Variables section ---------- */
      .te-cv-quickadd, .te-cv-freeform {
        display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
      }
      .te-cv-quickadd select, .te-cv-quickadd input[type="text"],
      .te-cv-freeform input[type="text"] {
        height: 32px; padding: 0 10px; border-radius: 6px; border: 1px solid #2c3d47;
        background: var(--te-input); color: var(--te-text); font-family: 'IBM Plex Sans', sans-serif; font-size: 12.5px;
      }
      .te-cv-quickadd select { min-width: 160px; }
      .te-cv-quickadd input[type="text"] { min-width: 140px; flex: 1; }
      .te-cv-freeform input[type="text"] { flex: 1; min-width: 160px; font-family: 'IBM Plex Mono', monospace; }
      .te-cv-quickadd input[type="color"] {
        width: 32px; height: 32px; padding: 0; border-radius: 6px; border: 1px solid #2c3d47; background: none; cursor: pointer;
      }

      /* ---------- Preview column ---------- */
      .te-preview-col {
        width: 430px; flex-shrink: 0; background: var(--te-rail); border-left: 1px solid #1e2c34;
        display: flex; flex-direction: column; min-height: 0;
      }
      .te-preview-head { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-bottom: 1px solid #1e2c34; flex-shrink: 0; }
      .te-preview-label { font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--te-text-3); flex: 1; }
      .te-preview-body { flex: 1; overflow-y: auto; padding: 14px; display: flex; justify-content: center; min-height: 0; }
      .te-preview-frame {
        border-radius: 10px; overflow: hidden; border: 1px solid var(--te-border-str);
        background: var(--primary-background-color, #0f1c2e); align-self: flex-start;
        transform: translateZ(0); position: relative; /* fixed-position background containment */
      }
      .te-preview-foot { padding: 10px 14px; border-top: 1px solid #1e2c34; display: flex; gap: 8px; flex-shrink: 0; }
      .te-preview-foot .te-btn { flex: 1; }

      .pf-header {
        display: flex; justify-content: space-between; align-items: center; padding: 9px 12px;
        background: var(--primary-background-color, #0f1c2e); color: var(--primary-color, #7fb2e5);
        font-size: 12px; border-bottom: 1px solid var(--divider-color, #213851);
      }
      .pf-header-left { display: flex; gap: 6px; align-items: center; }
      .pf-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--primary-color, #7fb2e5); }
      .pf-header-right { opacity: .6; }
      .pf-body { position: relative; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-height: 300px; isolation: isolate; }
      .pf-row { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; }
      .pf-title { color: var(--primary-text-color, #e6ecf4); font-size: 13.5px; font-weight: 500; position: relative; z-index: 1; }
      .pf-sub { color: var(--secondary-text-color, #8aa3bd); font-size: 11.5px; margin-top: 2px; }
      .pf-big { color: var(--primary-color, #7fb2e5); font-size: 24px; font-weight: 600; margin-top: 4px; letter-spacing: -0.01em; position: relative; z-index: 1; }
      .pf-big-small { color: var(--primary-color, #7fb2e5); font-size: 20px; font-weight: 600; margin-top: 4px; }
      .pf-badges { display: flex; gap: 8px; position: relative; z-index: 1; }

      /* Shared mockup-card look (used by preview frame, full preview, compare gallery) */
      .mockup-card {
        background: var(--ha-card-background, var(--card-background-color, #182b41));
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, #213851));
        border-radius: var(--ha-card-border-radius, 10px);
        padding: 12px 14px; color: var(--primary-text-color, #e6ecf4);
        position: relative; z-index: 1;
      }
      .mockup-toggle { width: 40px; height: 22px; border-radius: 11px; display: flex; align-items: center; padding: 0 3px; background: var(--switch-checked-track-color, #3c6395); }
      .mockup-toggle .knob { width: 16px; height: 16px; border-radius: 50%; background: var(--switch-checked-button-color, var(--primary-color, #7fb2e5)); margin-left: auto; }
      .mockup-slider { height: 6px; border-radius: 3px; background: var(--slider-bar-color, #1f3450); overflow: hidden; }
      .mockup-slider-fill { display: block; height: 100%; background: var(--slider-color, var(--primary-color, #7fb2e5)); }
      .mockup-badge {
        flex: 1; text-align: center; padding: 7px 0; border-radius: var(--ha-card-border-radius, 8px); font-size: 11.5px;
      }
      .mockup-badge.success { background: rgba(111,184,148,.16); color: var(--success-color, #6fb894); }
      .mockup-badge.warning { background: rgba(224,178,95,.16); color: var(--warning-color, #e0b25f); }
      .mockup-badge.error { background: rgba(224,112,95,.16); color: var(--error-color, #e0705f); }

      /* ---------- YAML dialog ---------- */
      .te-dialog-yaml {
        width: clamp(600px, 96vw, 1800px); height: clamp(500px, 90vh, 1000px);
        display: flex; flex-direction: column; padding: 0; overflow: hidden;
        background: #0b1216; position: relative;
      }
      .te-dialog-yaml .te-yaml-head { padding: 10px 56px 10px 16px; } /* right padding clears the fixed close button */
      .te-yaml-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 16px; border-bottom: 1px solid #1a252b; flex-shrink: 0; }
      .te-yaml-close-fixed {
        position: absolute; top: 10px; right: 12px; z-index: 2;
      }
      .te-yaml-guide-link { font-size: 11.5px; color: var(--te-accent); text-decoration: none; white-space: nowrap; }
      .te-yaml-guide-link:hover { text-decoration: underline; }
      .te-yaml-code {
        margin: 0; flex: 1; overflow-y: auto; overflow-x: hidden; padding: 12px 16px;
        font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; line-height: 1.6; color: #b9cdd8;
        white-space: pre-wrap; word-break: break-word;
        user-select: text; -webkit-user-select: text; -moz-user-select: text; cursor: text;
      }

      /* ---------- Dialogs ---------- */
      .te-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 10; }
      .te-overlay, .te-overlay * { user-select: text; -webkit-user-select: text; -moz-user-select: text; }
      .te-dialog {
        background: var(--te-surface); color: var(--te-text); padding: 18px; border-radius: 10px;
        width: min(480px, 90vw); display: flex; flex-direction: column; gap: 10px;
        border: 1px solid var(--te-border-str);
      }
      .te-dialog-wide { width: min(960px, 96vw); max-height: 88vh; overflow-y: auto; transform: translateZ(0); position: relative; }
      .te-dialog-title-row { display: flex; align-items: center; justify-content: space-between; }
      .te-dialog-title { font-size: 16px; font-weight: 600; }
      .te-dialog-title-actions { display: flex; gap: 8px; }
      .te-dialog-sub { font-size: 12px; color: var(--te-text-3); line-height: 1.5; }
      .te-dialog-sub code { background: rgba(127,127,127,0.15); padding: 1px 5px; border-radius: 4px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; }
      .te-dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
      .te-dialog textarea {
        width: 100%; box-sizing: border-box; font-family: 'IBM Plex Mono', monospace; font-size: 12px;
        background: var(--te-input); color: inherit; border: 1px solid #2c3d47; border-radius: 6px; padding: 8px; resize: vertical;
      }

      .te-preset-list { display: flex; flex-direction: column; gap: 8px; max-height: 320px; overflow-y: auto; }
      .te-preset-item { display: flex; align-items: center; gap: 10px; border: 1px solid var(--te-border); border-radius: 8px; padding: 8px 10px; }
      .te-preset-swatches { display: flex; flex-shrink: 0; }
      .te-preset-swatch { width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2); margin-left: -6px; }
      .te-preset-swatch:first-child { margin-left: 0; }
      .te-preset-info { flex: 1; min-width: 0; }
      .te-preset-name { font-size: 13px; font-weight: 600; }
      .te-preset-desc { font-size: 11px; color: var(--te-text-3); }

      .te-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; margin-top: 4px; }
      .te-vg-copy {
        margin-top: 10px; width: 100%; padding: 5px 8px; font-size: 10px; font-family: 'IBM Plex Mono', monospace;
        border-radius: 4px; cursor: pointer; background: rgba(127,127,127,0.12); border: 1px solid var(--te-border);
        color: var(--te-text-3); position: relative; z-index: 1;
      }
      .te-vg-copy:hover { background: rgba(127,127,127,0.22); }

      /* Full Preview sub-card styling (thermostat/weather/media/etc, unchanged concepts from v1.x) */
      .fp-dial { width: 96px; height: 96px; border-radius: 50%; margin: 8px auto; border: 4px solid var(--primary-color, #7fb2e5); display: flex; flex-direction: column; align-items: center; justify-content: center; }
      .fp-dial-value { font-size: 20px; font-weight: 700; }
      .fp-dial-sub { font-size: 10px; color: var(--secondary-text-color, #8aa3bd); text-align: center; }
      .fp-chip-row { display: flex; justify-content: center; gap: 6px; margin-top: 8px; }
      .fp-chip { font-size: 10px; padding: 3px 8px; border-radius: 10px; border: 1px solid var(--divider-color, #213851); color: var(--secondary-text-color, #8aa3bd); }
      .fp-chip.active { background: var(--primary-color, #7fb2e5); color: white; border-color: var(--primary-color, #7fb2e5); }
      .fp-weather-main { display: flex; align-items: center; gap: 10px; margin: 6px 0; }
      .fp-weather-icon { font-size: 28px; }
      .fp-weather-temp { font-size: 26px; font-weight: 700; }
      .fp-weather-row { display: flex; justify-content: space-between; font-size: 11px; color: var(--secondary-text-color, #8aa3bd); }
      .fp-media-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
      .fp-media-art { width: 40px; height: 40px; border-radius: 6px; background: var(--accent-color, #e8e3d3); flex-shrink: 0; }
      .fp-media-track { font-size: 13px; font-weight: 600; }
      .fp-media-artist { font-size: 11px; color: var(--secondary-text-color, #8aa3bd); }
      .fp-media-controls { text-align: center; margin-top: 8px; font-size: 16px; letter-spacing: 4px; }
      .fp-sparkline { width: 100%; height: 44px; margin: 6px 0; }
      .fp-sparkline polyline { stroke: var(--primary-color, #7fb2e5); }
      .fp-entity-row { display: flex; align-items: center; gap: 8px; padding: 5px 0; font-size: 12px; }
      .fp-entity-icon { flex-shrink: 0; }
      .fp-entity-name { flex: 1; }
      .fp-entity-value { color: var(--secondary-text-color, #8aa3bd); }
      .fp-alarm-status { text-align: center; font-size: 12px; font-weight: 600; margin: 6px 0; color: var(--state-active-color, #7fb2e5); }
      .fp-keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; }
      .fp-key { text-align: center; padding: 6px 0; font-size: 12px; border-radius: 4px; background: var(--secondary-background-color, #152438); color: var(--primary-text-color, #e6ecf4); }
      .fp-camera-placeholder { height: 90px; border-radius: 6px; background: var(--secondary-background-color, #152438); display: flex; align-items: center; justify-content: center; font-size: 26px; opacity: 0.6; }
      .fp-button-card { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; min-height: 90px; }
      .fp-button-icon { font-size: 26px; color: var(--state-icon-active-color, #7fb2e5); }
      .fp-button-label { font-size: 12px; }
      .fp-gauge-ring {
        width: 90px; height: 90px; border-radius: 50%; margin: 8px auto; position: relative;
        background: conic-gradient(var(--primary-color, #7fb2e5) 46%, var(--divider-color, #213851) 0);
        display: flex; align-items: center; justify-content: center;
      }
      .fp-gauge-ring::before { content: ""; position: absolute; width: 66px; height: 66px; border-radius: 50%; background: var(--ha-card-background, var(--card-background-color, #182b41)); }
      .fp-gauge-value { position: relative; z-index: 1; font-size: 15px; font-weight: 700; }
      .fp-badge-row { display: flex; gap: 8px; align-items: center; margin: 6px 0; }
      .fp-dot { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }

      /* ---------- <1024px: preview toggle + horizontal nav ---------- */
      .te-preview-toggle { display: none; }
      @container te (max-width: 1023px) {
        .te-workspace { position: relative; flex-wrap: wrap; }
        .te-nav { width: 100%; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid #1e2c34; padding: 8px; }
        .te-nav-row { width: auto; white-space: nowrap; }
        .te-preview-col {
          position: absolute; top: 0; left: 0; right: 0; width: auto; z-index: 5;
          max-height: 0; overflow: hidden; border-bottom: 1px solid #1e2c34;
          transition: max-height 200ms ease;
        }
        .te-preview-col.open { max-height: 70vh; }
        .te-preview-toggle {
          display: block; margin: 0 0 14px; height: 32px; padding: 0 12px; border-radius: 6px;
          border: 1px solid #2c3d47; background: var(--te-surface); color: #c4d3dc; font-size: 12.5px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .te-preview-frame[class*="theme-editor-bg-"] .bg-preview-style,
        .bgg-thumb, .te-bg-stage {
          animation: none !important;
        }
        * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
      }
    `;
  }
}

customElements.define("theme-editor-card", ThemeEditorCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "theme-editor-card",
  name: "Theme Editor Card",
  description: "Build a Home Assistant theme visually, with a live mockup preview and YAML export.",
  preview: false,
  version: CARD_VERSION,
});