module.exports = {
  extends: [
    'react-app',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Turning off these rules is just an unexpected action. This hurts so bad! :(
    // '@typescript-eslint/ban-ts-ignore': 'warn',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['error', { max: 300 }],
    'no-console': 'off',
    'prefer-const': 'error',
    'react/boolean-prop-naming': 'error',
    'react/jsx-max-depth': ['error', { max: 5 }],
    'react-hooks/exhaustive-deps': 'off', // Checks effect dependencies
    '@typescript-eslint/no-use-before-define': 'off',
    'import/order': 'error',
    'react/jsx-no-bind': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  ignorePatterns: ['**/*.json', '**/*.scss', 'public/', 'node_modules/'],
};
