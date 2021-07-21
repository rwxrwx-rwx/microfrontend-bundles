const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/fire');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-fire-firestore';

    custom.entry = {
      '@angular/fire/firestore': '@angular/fire/firestore'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser', '@angular/compiler', '@angular/platform-browser-dynamic', '@angular/fire', '@angular/fire/auth');

    return custom;
  };
