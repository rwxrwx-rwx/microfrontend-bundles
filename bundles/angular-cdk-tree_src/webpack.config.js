const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-tree';

    custom.entry = {
      '@angular/cdk/tree': '@angular/cdk/tree'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/collections', '@angular/cdk/coercion', '@angular/cdk/bidi', '@angular/cdk/keycodes', '@angular/cdk/platform', '@angular/cdk/observers', '@angular/cdk/a11y');

    return custom;
  };
