const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/core');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-core';

    custom.entry = {
      '@angular/core': '@angular/core'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js');

    return custom;
  };
