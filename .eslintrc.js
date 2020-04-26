module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off",
    "object-curly-spacing": "off",
    "arrow-parens": "off",
    "object-curly-newline": "off",
    "max-len": ["error", { "code": 128 }],
    "react/prop-types": "off",
    "react/jsx-closing-bracket-location": "off",
    "linebreak-style": "off"
  }
};
