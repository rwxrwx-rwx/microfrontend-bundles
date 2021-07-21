const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-upload';

    custom.entry = {
      'ng-zorro-antd/upload': 'ng-zorro-antd/upload'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/common/http', '@angular/cdk', '@angular/animations', '@angular/platform-browser', '@angular/forms', '@angular/router', 'ng-zorro-antd/core/environments', 'ng-zorro-antd/core/types', 'ng-zorro-antd/core/logger', 'ng-zorro-antd/core/util', 'ng-zorro-antd/core/time', 'ng-zorro-antd/i18n', 'ng-zorro-antd/core/polyfill', 'ng-zorro-antd/core/services', 'ng-zorro-antd/core/config', 'ng-zorro-antd/icon', 'ng-zorro-antd/core/transition-patch', '@angular/animations/browser', '@angular/platform-browser/animations', 'ng-zorro-antd/core/wave', 'ng-zorro-antd/button', 'ng-zorro-antd/core/outlet', 'ng-zorro-antd/progress', 'ng-zorro-antd/core/animation', 'ng-zorro-antd/core/color', 'ng-zorro-antd/core/no-animation', 'ng-zorro-antd/core/overlay', 'ng-zorro-antd/tooltip');

    return custom;
  };
