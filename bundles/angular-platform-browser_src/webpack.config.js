const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/platform-browser');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-platform-browser';

    custom.entry = {
      '@angular/platform-browser': '@angular/platform-browser'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations');

    return custom;
  };
