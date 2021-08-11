const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/fire');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-fire-analytics';

    custom.entry = {
      '@angular/fire/analytics': '@angular/fire/analytics'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@firebase/util', '@firebase/logger', '@firebase/component', '@firebase/app', '@firebase/database', '@firebase/webchannel-wrapper', '@firebase/firestore', '@firebase/functions', '@firebase/installations', '@firebase/messaging', '@firebase/polyfill', '@firebase/storage', '@firebase/performance', '@firebase/remote-config', '@firebase/analytics', '@firebase/app-check', 'firebase/app', '@angular/animations', '@angular/platform-browser', '@angular/compiler', '@angular/platform-browser-dynamic', 'firebase', '@angular/fire', '@angular/router', 'firebase/auth', '@angular/fire/auth', 'firebase/analytics');

    return custom;
  };
