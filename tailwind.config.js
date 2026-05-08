/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "card-hover": "var(--card-hover)",
        "card-active": "var(--card-active)",
        alert: "#ff4455",
        warning: "#ffaa00",
        info: "#00ccff",
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        "space-mono": ["Space Mono", "monospace"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
}
