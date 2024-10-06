module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Prefer single quotes
    quotes: ['warn', 'single'],
    'prefer-const': 'error',
    'no-const-assign': 'error',
    'no-var': 'error',
    'no-array-constructor': 'warn',
    'no-new-object': 'warn',
    'object-shorthand': 'warn',
    'quote-props': ['warn', 'as-needed'],
    'no-loop-func': 'error',
    'no-param-reassign': 'error',
    'prefer-arrow-callback': 'off',
    'arrow-spacing': 'warn',
    'space-before-blocks': 'warn',
    'keyword-spacing': 'warn',
    // Require trailing commas in multiline literals
    'comma-dangle': ['warn', 'always-multiline'],
    camelcase: 'off',
    'no-dupe-keys': 'warn',
    // Unused variables and parameters
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'no-use-before-define': ['warn', 'nofunc'],
    'no-console': 'warn',
    // React rules
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react/react-in-jsx-scope': 'warn',
    'prettier/prettier': 'warn',
  },
};
