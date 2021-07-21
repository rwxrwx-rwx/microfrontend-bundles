const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('rxjs');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'rxjs-operators';

    custom.entry = {
      'rxjs/operators': 'rxjs/operators'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib');

    return custom;
  };
