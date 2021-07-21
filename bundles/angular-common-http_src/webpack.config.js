const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/common');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-common-http';

    custom.entry = {
      '@angular/common/http': '@angular/common/http'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common');

    return custom;
  };
