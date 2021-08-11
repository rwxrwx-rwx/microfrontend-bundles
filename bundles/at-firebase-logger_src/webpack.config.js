const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/logger');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-logger';

    custom.entry = {
      '@firebase/logger': '@firebase/logger'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push();

    return custom;
  };
