const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/forms');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-forms';

    custom.entry = {
      '@angular/forms': '@angular/forms'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser');

    return custom;
  };
