const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-drag-drop';

    custom.entry = {
      '@angular/cdk/drag-drop': '@angular/cdk/drag-drop'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/bidi', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y');

    return custom;
  };
