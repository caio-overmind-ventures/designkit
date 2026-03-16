/** Tailwind CSS Preset — app.vercel.com */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "primary": {
          "50": "#f2f8ff",
          "100": "#e6f1fe",
          "200": "#cce3fd",
          "300": "#a6cefc",
          "400": "#73b1fa",
          "500": "#0072f5",
          "600": "#0061d0",
          "700": "#0050ac",
          "800": "#003f87",
          "900": "#002e62",
          "DEFAULT": "#0072f5"
        },
        "background": "#ffffff",
        "foreground": "#171717",
        "accent": {
          "DEFAULT": "#0072f5"
        },
        "link": "#0072f5",
        "error": "#ee0000",
        "warning": "#f5a623",
        "success": "#0070f3",
        "gray": {
          "100": "#f2f2f2",
          "200": "#ebebeb",
          "300": "#e6e6e6",
          "400": "#ebebeb",
          "500": "#c9c9c9",
          "600": "#a8a8a8",
          "700": "#8f8f8f",
          "800": "#7d7d7d",
          "900": "#4d4d4d",
          "1000": "#171717"
        }
      },
      "fontFamily": {
        "sans": [
          "'Geist'",
          "system-ui",
          "sans-serif"
        ],
        "mono": [
          "'Geist Mono'",
          "monospace"
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
