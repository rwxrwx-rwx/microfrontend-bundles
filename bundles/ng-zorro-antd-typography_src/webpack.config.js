const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-typography';

    custom.entry = {
      'ng-zorro-antd/typography': 'ng-zorro-antd/typography'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/clipboard', '@angular/cdk/platform', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/trans-button', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/logger', '@angular/cdk/coercion', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n', '@angular/common/http', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/icon', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y', 'ng-zorro-antd/input', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/color', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/no-animation', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/portal', '@angular/cdk/overlay', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/tooltip');

    return custom;
  };
