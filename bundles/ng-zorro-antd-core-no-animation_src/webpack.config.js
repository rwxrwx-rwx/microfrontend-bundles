const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-core-no-animation';

    custom.entry = {
      'ng-zorro-antd/core/no-animation': 'ng-zorro-antd/core/no-animation'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/coercion', '@angular/animations', '@angular/platform-browser', '@angular/animations/browser', '@angular/platform-browser/animations', '@angular/cdk', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util');

    return custom;
  };
