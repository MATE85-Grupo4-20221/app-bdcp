module.exports = {
  "*.{js,jsx,ts,tsx}": () => "yarn lint:fix",
  "*.{ts,tsx}": () => "yarn check-types",
}