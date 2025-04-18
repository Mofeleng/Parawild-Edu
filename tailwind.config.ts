import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: "hsl(var(--primary))",
  			"primary-accent": "hsl(var(--primary-accent))",
  			secondary: "hsl(var(--secondary))",
  			"secondary-accent": "hsl(var(--secondary-accent))",
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			card: "hsl(var(--card))",
  			"card-foreground": "hsl(var(--card-foreground))",
  			popover: "hsl(var(--popover))",
  			"popover-foreground": "hsl(var(--popover-foreground))",
  			"primary-foreground": "hsl(var(--primary-foreground))",
  			"secondary-foreground": "hsl(var(--secondary-foreground))",
  			muted: "hsl(var(--muted))",
  			"muted-foreground": "hsl(var(--muted-foreground))",
  			accent: "hsl(var(--accent))",
  			"accent-foreground": "hsl(var(--accent-foreground))",
  			destructive: "hsl(var(--destructive))",
  			"destructive-foreground": "hsl(var(--destructive-foreground))",
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
