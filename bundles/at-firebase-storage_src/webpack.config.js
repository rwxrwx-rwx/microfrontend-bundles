const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/storage');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-storage';

    custom.entry = {
      '@firebase/storage': '@firebase/storage'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/component', '@firebase/logger', '@firebase/app');

    return custom;
  };
