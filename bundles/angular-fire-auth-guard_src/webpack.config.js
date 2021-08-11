const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('@angular/fire');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = 'angular-fire-auth-guard';

    custom.entry = {
      '@angular/fire/auth-guard': '@angular/fire/auth-guard'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push('tslib', 'rxjs', 'rxjs/operators', 'zone.js', '@angular/core', '@angular/common', '@angular/animations', '@angular/platform-browser', '@angular/router', '@firebase/util', '@firebase/logger', '@firebase/component', '@firebase/app', '@firebase/database', '@firebase/webchannel-wrapper', '@firebase/firestore', '@firebase/functions', '@firebase/installations', '@firebase/messaging', '@firebase/polyfill', '@firebase/storage', '@firebase/performance', '@firebase/remote-config', '@firebase/analytics', '@firebase/app-check', 'firebase/app', '@angular/compiler', '@angular/platform-browser-dynamic', 'firebase', '@angular/fire', 'firebase/auth', '@angular/fire/auth');

    return custom;
  };
