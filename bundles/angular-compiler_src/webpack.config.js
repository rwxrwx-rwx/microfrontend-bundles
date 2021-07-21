const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/compiler');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-compiler';

    custom.entry = {
      '@angular/compiler': '@angular/compiler'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib');

    return custom;
  };
