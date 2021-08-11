const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-notification';

    custom.entry = {
      'ng-zorro-antd/notification': 'ng-zorro-antd/notification'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/animations', '@angular/common', '@angular/cdk', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/animation', '@angular/cdk/portal', 'ng-zorro-antd/core/types', '@angular/cdk/bidi', 'ng-zorro-antd/core/environments', '@angular/cdk/coercion', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', '@angular/cdk/platform', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/keycodes', '@angular/cdk/overlay', 'ng-zorro-antd/core/outlet', '@angular/common/http', 'ng-zorro-antd/icon', 'ng-zorro-antd/message');

    return custom;
  };
