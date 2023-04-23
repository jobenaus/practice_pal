import { type Config } from "tailwindcss";
import formPlugin from '@tailwindcss/forms'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    formPlugin
  ],
} satisfies Config;
