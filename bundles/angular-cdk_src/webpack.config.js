const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/cdk');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-cdk';

    custom.entry = {
      '@angular/cdk': '@angular/cdk'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common');

    return custom;
  };
