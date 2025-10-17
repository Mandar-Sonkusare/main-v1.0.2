module.exports = {
  content: [
    "./src/**/*.html",
    "./src/partials/**/*.htm",
    "./src/**/*.js",
    "./src/**/*.scss",
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      screens: {
        "2xl": "1430px",
      },
      fontFamily: {
        satoshi: ["'Satoshi'"],
        instrument: ["'Instrument Serif', system-ui"],
      },
      colors: {
        primary: "#0ce5d8",
        secondary: "#000",
        backgroundBody: "#fff",
        colorText: "#666666",
        dark: {
          DEFAULT: "#151515",
          100: "#ffffffb3",
          200: "#212220",
          300: "#191A17",
          gradient: "#191917",
        },
      },
      borderColor: {
        DEFAULT: "#e5e5e5",
        dark: "#2c2c2c",
      },
      backgroundImage: {
        "home-ai-hero": "url('/images/home-ai/hero-ai.png')",
      },
      transitionTimingFunction: {
        "faq-body-transition": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "in-expo": "cubic-bezier(0.6,-0.28,0.74,0.05);",
        "team-bezier": "cubic-bezier(.21,.25,.76,.71)",
      },
      boxShadow: {
        nav: "0px 0px 30px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  safelist: [
    {
      pattern: /scale-/,
    },
  ],
  plugins: [],
  textRendering: {
    "optimize-legibility": "optimizeLegibility",
    "optimize-speed": "optimizeSpeed",
  },
};
