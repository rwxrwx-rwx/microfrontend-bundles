const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-menu';

    custom.entry = {
      'ng-zorro-antd/menu': 'ng-zorro-antd/menu'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', '@angular/cdk/platform', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/outlet', '@angular/common/http', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/icon');

    return custom;
  };
