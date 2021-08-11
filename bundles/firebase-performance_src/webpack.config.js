const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('firebase');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'firebase-performance';

    custom.entry = {
      'firebase/performance': 'firebase/performance'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@firebase/util', '@firebase/logger', '@firebase/component', '@firebase/app', '@firebase/database', '@firebase/webchannel-wrapper', '@firebase/firestore', '@firebase/functions', '@firebase/installations', '@firebase/messaging', '@firebase/polyfill', '@firebase/storage', '@firebase/performance', '@firebase/remote-config', '@firebase/analytics', '@firebase/app-check');

    return custom;
  };
