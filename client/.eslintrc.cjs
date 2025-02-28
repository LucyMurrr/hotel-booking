module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      // 'plugin:react-hooks/recommended',
      'airbnb',
      'plugin:@typescript-eslint/strict-type-checked',
      // 'plugin:@typescript-eslint/stylistic-type-checked',
      'next/core-web-vitals',
      'next/typescript',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      projectService: true,
      project: './tsconfig.app.json',
    },
    settings: { react: { version: '18.3' } },
    plugins: ['react-refresh', '@typescript-eslint'],
    rules: {
      'max-len': ['error', {'code': 108 }],
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-one-expression-per-line': 'off',
      'react/prop-types': 'off',
      'import/extensions': 'off',
      'import/no-anonymous-default-export': 'off',
      'object-curly-newline': ['error', {
        multiline: true,
        minProperties: 5,
        consistent: true,
      }],
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "arrow-function",
          "unnamedComponents": "arrow-function",
        }
      ],
      'jsx-a11y/label-has-associated-control': 'off',
      'react/jsx-filename-extension': [0,
          {
            "extensions": [
              ".tsx"
            ]
          }
        ],
        '@next/next/no-html-link-for-pages': ['error', './app'],
        '@next/next/no-img-element': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/unbound-method': 'off'
    },
    overrides: [
      {
        files: ['**/*.js', '**/*.jsx'],
        extends: ['plugin:@typescript-eslint/disable-type-checked'],
      },
    ]
  }
