const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-accordion';

    custom.entry = {
      '@angular/cdk/accordion': '@angular/cdk/accordion'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/collections', '@angular/cdk/coercion');

    return custom;
  };
