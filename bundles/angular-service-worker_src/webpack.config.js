const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/service-worker');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-service-worker';

    custom.entry = {
      '@angular/service-worker': '@angular/service-worker'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common');

    return custom;
  };
