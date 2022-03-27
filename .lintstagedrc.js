module.exports = {
  "*.{js,jsx,ts,tsx}": (filenames) => `yarn lint:fix ${filenames.replace(',', '')}`,
  "*.{ts,tsx}": () => "yarn check-types",
}