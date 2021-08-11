const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@ngneat/transloco');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'ngneat-transloco';

    custom.entry = {
      '@ngneat/transloco': '@ngneat/transloco'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs/operators', 'rxjs', 'zone.js', '@angular/core');

    return custom;
  };
