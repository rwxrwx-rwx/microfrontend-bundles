const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/app');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-app';

    custom.entry = {
      '@firebase/app': '@firebase/app'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/logger', '@firebase/component');

    return custom;
  };
