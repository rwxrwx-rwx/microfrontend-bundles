const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/database');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-database';

    custom.entry = {
      '@firebase/database': '@firebase/database'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('@firebase/logger', 'tslib', '@firebase/util', '@firebase/component');

    return custom;
  };
