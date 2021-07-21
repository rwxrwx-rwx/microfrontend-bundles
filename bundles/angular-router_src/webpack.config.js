const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/router');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-router';

    custom.entry = {
      '@angular/router': '@angular/router'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser');

    return custom;
  };
