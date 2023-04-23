import { type Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
} satisfies Config;
