const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/common');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-common';

    custom.entry = {
      '@angular/common': '@angular/common'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core');

    return custom;
  };
