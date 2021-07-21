const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-stepper';

    custom.entry = {
      '@angular/cdk/stepper': '@angular/cdk/stepper'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/keycodes', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/cdk/bidi');

    return custom;
  };
