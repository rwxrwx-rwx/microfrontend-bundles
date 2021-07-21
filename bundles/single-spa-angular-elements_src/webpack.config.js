const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('single-spa-angular');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'single-spa-angular-elements';

    custom.entry = {
      'single-spa-angular/elements': 'single-spa-angular/elements'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', 'single-spa-angular/internals');

    return custom;
  };
