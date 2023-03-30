const path = require('path');

module.exports = {
  resolve: {
    alias: {
      path: 'path-browserify',
      os: 'os-browserify/browser',
    },
    fallback: {
      fs: false,
    },
  },
};
