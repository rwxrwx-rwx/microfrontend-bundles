const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/util');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-util';

    custom.entry = {
      '@firebase/util': '@firebase/util'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib');

    return custom;
  };
