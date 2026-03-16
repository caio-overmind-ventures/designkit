/** Tailwind CSS Preset — app.linear.app */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "primary": {
          "50": "#f2f2f2",
          "100": "#e6e6e6",
          "200": "#cccccc",
          "300": "#a6a6a6",
          "400": "#737373",
          "500": "#000000",
          "600": "#000000",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000",
          "DEFAULT": "#000000"
        },
        "background": "#ffffff",
        "foreground": "#000000"
      },
      "fontFamily": {
        "sans": [
          "'system-ui'",
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
