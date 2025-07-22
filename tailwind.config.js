module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",    // ← ajouter ts et scss (ou css)
  ],
  theme: { extend: {} },
  plugins: [ require('@tailwindcss/forms') ],
}
