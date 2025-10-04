export default {
  '*.{ts,tsx}': () => 'tsc -p tsconfig.json --noEmit',
  '*.{js,jsx,ts,tsx}': 'eslint --cache --fix',
  '*.{js,jsx,ts,tsx,json,css,md}': 'prettier --write',
};
