const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/platform-browser-dynamic');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-platform-browser-dynamic';

    custom.entry = {
      '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', '@angular/compiler', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser');

    return custom;
  };
