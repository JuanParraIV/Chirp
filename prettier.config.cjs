/** @type {import("prettier").Options}*/
const config = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@prisma/prettier-plugin")
  ],
  // your other options here
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  tabWidth: 2,
};

module.exports = config;
