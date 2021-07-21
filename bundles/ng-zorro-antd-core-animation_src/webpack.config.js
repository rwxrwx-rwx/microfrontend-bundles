const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('ng-zorro-antd');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ng-zorro-antd-core-animation';

    custom.entry = {
      'ng-zorro-antd/core/animation': 'ng-zorro-antd/core/animation'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/animations', '@angular/common', '@angular/cdk', '@angular/platform-browser', '@angular/forms', '@angular/router');

    return custom;
  };
