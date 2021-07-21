const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk-clipboard';

    custom.entry = {
      '@angular/cdk/clipboard': '@angular/cdk/clipboard'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common');

    return custom;
  };
