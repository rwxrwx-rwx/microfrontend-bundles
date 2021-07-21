const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('single-spa-angular');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'single-spa-angular-internals';

    custom.entry = {
      'single-spa-angular/internals': 'single-spa-angular/internals'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core');

    return custom;
  };
