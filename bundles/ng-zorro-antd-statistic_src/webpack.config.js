const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-statistic';

    custom.entry = {
      'ng-zorro-antd/statistic': 'ng-zorro-antd/statistic'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/platform', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/logger', '@angular/cdk/coercion', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/time', 'ng-zorro-antd/core/pipe');

    return custom;
  };
