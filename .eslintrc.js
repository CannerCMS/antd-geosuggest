module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:flowtype/recommended"
  ],
  parser: "babel-eslint",
  globals: {
    "google": true
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: [
    "react",
    "flowtype"
  ],
  rules: {
    "react/prop-types": 0,
    "no-implicit-coercion": 0,
    "max-len": 0
  }
};
