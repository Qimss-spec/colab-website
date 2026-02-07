// src/config/pageThemes.js

export const makeTheme = (primary, secondary) =>
  `linear-gradient(90deg, ${primary} 0%, ${secondary} 100%)`;

export const pageThemes = {
  home: makeTheme(
    "rgba(0, 255, 255, 0.95)",   // bright cyan
    "rgba(0, 191, 255, 0.85)"    // bright blue
  ),

  emulator: makeTheme(
    "rgba(174, 0, 255, 0.89)",   // bright green
    "rgba(255, 255, 0, 0.80)"    // bright yellow
  ),

  nintendo: makeTheme(
    "rgba(255, 0, 0, 0.90)",    // bright red
    "rgba(255, 105, 180, 0.80)"     // bright pink
  ),

  ps2: makeTheme(
    "rgba(0, 191, 255, 0.90)",   // bright blue
    "rgba(75, 0, 130, 0.80)"    // bright indigo
  ),

  ps3: makeTheme(
    "rgba(255, 0, 255, 0.90)",   // bright purple
    "rgba(255, 182, 193, 0.80)"    // bright pink
  ),

  psp: makeTheme(
    "rgba(255, 182, 193, 0.90)",   // bright pink
    "rgba(255, 0, 255, 0.80)"    // bright purple
  ),

  admin: makeTheme(
    "rgba(255, 215, 0, 0.90)",   // bright gold
    "rgba(255, 140, 0, 0.80)"    // bright orange
  ),

  auth: makeTheme(
    "rgba(0, 255, 127, 0.90)",
    "rgba(0, 191, 255, 0.80)"
  ),
};

