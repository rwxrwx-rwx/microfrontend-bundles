const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-tree-view';

    custom.entry = {
      'ng-zorro-antd/tree-view': 'ng-zorro-antd/tree-view'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/animations', '@angular/platform-browser', '@angular/animations/browser', '@angular/platform-browser/animations', '@angular/cdk', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/no-animation', '@angular/cdk/keycodes', '@angular/cdk/observers', '@angular/cdk/a11y', '@angular/cdk/tree', 'ng-zorro-antd/core/animation');

    return custom;
  };
