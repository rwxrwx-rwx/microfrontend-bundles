const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/fire');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-fire-auth';

    custom.entry = {
      '@angular/fire/auth': '@angular/fire/auth'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser', '@angular/compiler', '@angular/platform-browser-dynamic', '@angular/fire');

    return custom;
  };
