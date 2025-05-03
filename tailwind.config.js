// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        // Using names related to your original CSS variables for clarity
        'primary': '#58A6FF',         // --primary-color
        'secondary': '#79C0FF',       // --secondary-color
        'text-main': '#e1e1e1',        // --text-color (Tailwind's gray-200/300 might be close too)
        'bg-main': '#121212',          // --bg-color (Tailwind's gray-900 is similar)
        'card-bg': '#1e1e1e',          // --card-bg (Tailwind's gray-800 is similar)
        'footer-bg': '#181818',        // --footer-bg (Very dark gray)
        'glass-border': 'rgba(255, 255, 255, 0.15)', // --glass-border
        'glass-bg': 'rgba(40, 40, 40, 0.25)',     // --glass-bg
        // You can also define the gradient colors if used directly
        'bg-gradient-start': 'rgba(20, 30, 40, 0.8)',
        'bg-gradient-end': 'rgba(10, 15, 25, 0.8)',
      },
      fontFamily: {
        // Add 'Inter' to your sans-serif stack
        sans: ['Inter', 'sans-serif'], // --font-main
      },
      maxWidth: {
        'container': '1100px', // --max-width (or use Tailwind's screen sizes like lg/xl)
      },
      borderRadius: {
        'custom': '12px', // --border-radius (Tailwind's xl is 12px, but this is explicit)
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.3)', // --shadow (Tailwind's lg/xl are options too)
      },
      transitionDuration: {
        'default': '300ms', // --transition-speed
      },
      backgroundImage: {
        // Define the background image if you want to reference it via class
        'main-bg': "url('/img/background.jpg')", // Adjust path as needed relative to your public/asset folder
      },
      // Add custom keyframes/animations if needed (e.g., for fadeInUp)
       keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease forwards',
      },
    },
    // Define container settings if you want to use Tailwind's @apply container
    container: {
      center: true,
      padding: '1rem', // Corresponds to original 20px padding / 2 = 1rem
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1100px', // Match your max-width
      },
    },
  },
  plugins: [],
}