const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-experimental-image';

    custom.entry = {
      'ng-zorro-antd/experimental/image': 'ng-zorro-antd/experimental/image'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/types', '@angular/cdk/bidi', 'ng-zorro-antd/core/environments', '@angular/cdk/coercion', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/polyfill', '@angular/cdk/platform', '@angular/cdk/layout', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/cdk/drag-drop', '@angular/cdk/portal', '@angular/cdk/overlay', '@angular/common/http', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/pipes', 'ng-zorro-antd/image');

    return custom;
  };
