import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bg: 'var(--color-bg)',
        textPrimary: 'var(--color-textPrimary)',
        textSecondary: 'var(--color-textSecondary)',
        textContrast: 'var(--color-textContrast)',
        transparent: 'transparent'

      }
    },

  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hover-active', ['&:group-hover', '.hover-active &']);
      addVariant('touch-active', ['.touch-active &']);
    }
  ],
};
export default config;
