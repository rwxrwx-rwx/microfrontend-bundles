const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/analytics');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-analytics';

    custom.entry = {
      '@firebase/analytics': '@firebase/analytics'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/component', '@firebase/logger', '@firebase/app', '@firebase/installations');

    return custom;
  };
