const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-radio';

    custom.entry = {
      'ng-zorro-antd/radio': 'ng-zorro-antd/radio'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/cdk/bidi', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/cdk/coercion', '@angular/cdk', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', '@angular/cdk/keycodes', '@angular/cdk/platform', '@angular/cdk/observers', '@angular/cdk/a11y');

    return custom;
  };
