/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  singleQuote: true,
  importOrder: [
    '^(react|react-dom)$',
    '<THIRD_PARTY_MODULES>',
    '',
    // Absolute imports, starting with `~/`
    '^~/(.*)$',
    '',
    // Parent imports. Put `..` last.
    '^\\.\\.(?!/?$)',
    '^\\.\\./?$',
    // Other relative imports (excluding .module.scss). Put same-folder imports and `.` last.
    '^\\./(?=.*/)(?!/?$)(?!.*\\.module\\.scss$)',
    '^\\.(?!/?$)(?!.*\\.module\\.scss$)',
    '^\\./?$',
    '',
    // SCSS module imports
    '^.*\\.module\\.scss$',
  ],
};

export default config;
