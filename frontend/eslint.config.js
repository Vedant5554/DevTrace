import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/', 'node_modules/'],
  },
  // Base config for all files - browser globals
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
        console: 'readonly',
        require: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: '18.3',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
  // React hooks plugin for all files
  {
    files: ['**/*.js', '**/*.jsx'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
  // Restrict imports only in algorithms and canvases
  {
    files: ['src/algorithms/**/*.js', 'src/canvases/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              message: 'Algorithms must not import from React. Use plain JavaScript only.',
            },
            {
              name: 'react-dom',
              message: 'Algorithms must not import from React DOM. Use plain JavaScript only.',
            },
            {
              name: 'framer-motion',
              message: 'Algorithms must not import from Framer Motion. Use plain JavaScript only.',
            },
          ],
        },
      ],
    },
  },
];
