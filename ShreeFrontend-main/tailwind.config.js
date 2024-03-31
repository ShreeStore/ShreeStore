/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: process.env.COLOR_PRIMARY || '#fff',
                secondary: process.env.COLOR_SECONDARY || '#a786db',
                tertiary: process.env.COLOR_TERTIARY || '#a480a4',
                primaryText: process.env.COLOR_PRIMARY_TEXT || '#000',
                secondaryText: process.env.COLOR_SECONDARY_TEXT || '#fff',
            }
        },
    },
    plugins: [],
}