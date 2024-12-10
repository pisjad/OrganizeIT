/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                'pink': '#FF2473',
                'pink2': '#D7004E'  // Menambahkan warna kustom dengan nama 'custom-pink'
            },
        },
    },
    plugins: [],
};
