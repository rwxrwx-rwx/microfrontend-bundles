const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@firebase/webchannel-wrapper');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'at-firebase-webchannel-wrapper';

    custom.entry = {
      '@firebase/webchannel-wrapper': '@firebase/webchannel-wrapper'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push();

    return custom;
  };
