const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@casl/angular');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'casl-angular';

    custom.entry = {
      '@casl/angular': '@casl/angular'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@casl/ability');

    return custom;
  };
