const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-form';

    custom.entry = {
      'ng-zorro-antd/form': 'ng-zorro-antd/form'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/layout', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', 'ng-zorro-antd/core/services', 'ng-zorro-antd/grid', '@angular/common/http', 'ng-zorro-antd/core/config', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/color', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/no-animation', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/overlay', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/tooltip', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n');

    return custom;
  };
