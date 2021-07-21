const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-a11y';

    custom.entry = {
      '@angular/cdk/a11y': '@angular/cdk/a11y'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/keycodes', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/observers');

    return custom;
  };
