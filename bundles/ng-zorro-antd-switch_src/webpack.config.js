const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-switch';

    custom.entry = {
      'ng-zorro-antd/switch': 'ng-zorro-antd/switch'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/keycodes', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/cdk/bidi', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/cdk', '@angular/router', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/core/outlet', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/wave', '@angular/common/http', 'ng-zorro-antd/icon');

    return custom;
  };
