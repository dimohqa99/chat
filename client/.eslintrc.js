module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
  },
  plugins: ['react-hooks', 'prettier'],
  extends: ['airbnb-typescript', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/self-closing-comp': 'off',
    'react/jsx-curly-newline': 'off',
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-wrap-multilines': 0,
    'no-underscore-dangle': 0,
    '@typescript-eslint/indent': 'off',
    'react/require-default-props': 'off',
  },
};
