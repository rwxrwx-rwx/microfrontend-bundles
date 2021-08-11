const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/polyfill');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-polyfill';

    custom.entry = {
      '@firebase/polyfill': '@firebase/polyfill'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push();

    return custom;
  };
