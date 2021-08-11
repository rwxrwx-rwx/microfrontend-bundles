const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@casl/ability');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'casl-ability';

    custom.entry = {
      '@casl/ability': '@casl/ability'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push();

    return custom;
  };
