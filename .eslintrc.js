module.exports = {
  'plugins': [
    'css',
    'html',
  ],
  'extends': [
    'plugin:css/recommended',
  ],
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  parser: 'babel-eslint',
  parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module'
  },
  'rules': {
  },
};
