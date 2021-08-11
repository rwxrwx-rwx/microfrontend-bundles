const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-pagination';

    custom.entry = {
      'ng-zorro-antd/pagination': 'ng-zorro-antd/pagination'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/environments', '@angular/cdk/coercion', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', '@angular/cdk/platform', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n', '@angular/common/http', 'ng-zorro-antd/icon', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/cdk/portal', '@angular/cdk/overlay', 'ng-zorro-antd/core/animation', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/transition-patch', 'ng-zorro-antd/empty', 'ng-zorro-antd/select');

    return custom;
  };
