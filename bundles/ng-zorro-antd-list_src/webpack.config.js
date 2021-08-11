const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-list';

    custom.entry = {
      'ng-zorro-antd/list': 'ng-zorro-antd/list'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/coercion', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', '@angular/cdk/bidi', '@angular/cdk/platform', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', '@angular/common/http', 'ng-zorro-antd/icon', 'ng-zorro-antd/avatar', 'ng-zorro-antd/core/outlet', '@angular/cdk/portal', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n', 'ng-zorro-antd/empty', 'ng-zorro-antd/grid', '@angular/cdk/observers', 'ng-zorro-antd/spin');

    return custom;
  };
