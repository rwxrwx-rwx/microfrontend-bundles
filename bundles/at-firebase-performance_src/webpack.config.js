const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/performance');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-performance';

    custom.entry = {
      '@firebase/performance': '@firebase/performance'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('@firebase/logger', 'tslib', '@firebase/util', '@firebase/component', '@firebase/app', '@firebase/installations');

    return custom;
  };
