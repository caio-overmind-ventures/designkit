/** Tailwind CSS Preset — midday.ai */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "primary": {
          "50": "#f3f3f3",
          "100": "#e7e7e7",
          "200": "#d0d0d0",
          "300": "#acacac",
          "400": "#7d7d7d",
          "500": "#121212",
          "600": "#0f0f0f",
          "700": "#0d0d0d",
          "800": "#0a0a0a",
          "900": "#070707",
          "DEFAULT": "#121212"
        },
        "background": "#ffffff",
        "foreground": "#121212"
      },
      "fontFamily": {
        "sans": [
          "'Hedvig Letters Sans'",
          "system-ui",
          "sans-serif"
        ]
      },
      "borderRadius": {
        "DEFAULT": "6px",
        "sm": "calc(6px * 0.5)",
        "lg": "calc(6px * 1.5)",
        "xl": "calc(6px * 2)",
        "full": "9999px"
      }
    }
  }
};
