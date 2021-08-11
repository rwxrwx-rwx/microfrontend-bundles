const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/remote-config');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-remote-config';

    custom.entry = {
      '@firebase/remote-config': '@firebase/remote-config'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/component', '@firebase/logger', '@firebase/app', '@firebase/installations');

    return custom;
  };
