const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@casl/ability');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'casl-ability-extra';

    custom.entry = {
      '@casl/ability/extra': '@casl/ability/extra'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push();

    return custom;
  };
