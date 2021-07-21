const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/platform-browser');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-platform-browser-animations';

    custom.entry = {
      '@angular/platform-browser/animations': '@angular/platform-browser/animations'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser', '@angular/animations/browser');

    return custom;
  };
