const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-breadcrumb';

    custom.entry = {
      'ng-zorro-antd/breadcrumb': 'ng-zorro-antd/breadcrumb'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/animations', '@angular/platform-browser', '@angular/router', '@angular/cdk', '@angular/forms', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', '@angular/cdk/coercion', 'ng-zorro-antd/core/util', '@angular/cdk/platform', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/overlay', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', '@angular/common/http', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/transition-patch', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/button', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/menu', 'ng-zorro-antd/dropdown');

    return custom;
  };
