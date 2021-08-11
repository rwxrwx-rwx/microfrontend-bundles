const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-table';

    custom.entry = {
      'ng-zorro-antd/table': 'ng-zorro-antd/table'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/platform', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/cdk', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', '@angular/common/http', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/transition-patch', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/button', 'ng-zorro-antd/cdk/resize-observer', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y', 'ng-zorro-antd/checkbox', 'ng-zorro-antd/core/outlet', '@angular/cdk/portal', '@angular/cdk/overlay', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/menu', 'ng-zorro-antd/dropdown', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n', 'ng-zorro-antd/empty', 'ng-zorro-antd/select', 'ng-zorro-antd/pagination', 'ng-zorro-antd/radio', 'ng-zorro-antd/spin');

    return custom;
  };
