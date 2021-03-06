const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-core-overlay';

    custom.entry = {
      'ng-zorro-antd/core/overlay': 'ng-zorro-antd/core/overlay'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/coercion', '@angular/cdk/platform', '@angular/cdk/bidi', '@angular/cdk/collections', '@angular/cdk/scrolling', '@angular/cdk/portal', '@angular/cdk/keycodes', '@angular/cdk/overlay', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router');

    return custom;
  };
