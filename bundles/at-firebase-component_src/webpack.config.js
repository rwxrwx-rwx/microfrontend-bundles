const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/component');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-component';

    custom.entry = {
      '@firebase/component': '@firebase/component'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util');

    return custom;
  };
