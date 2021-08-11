const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/functions');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-functions';

    custom.entry = {
      '@firebase/functions': '@firebase/functions'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/component', '@firebase/logger', '@firebase/app');

    return custom;
  };
