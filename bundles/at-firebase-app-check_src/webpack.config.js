const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/app-check');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-app-check';

    custom.entry = {
      '@firebase/app-check': '@firebase/app-check'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/component', '@firebase/logger', '@firebase/app');

    return custom;
  };
