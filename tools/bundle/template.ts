import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import { sortObject } from './utils';

function writeBrowser(dir: string) {
  const file = '.browserslistrc';
  const template = `# This file is used by the build system to adjust CSS and JS output to support the specified browsers below.
# For additional information regarding the format and rule options, please see:
# https://github.com/browserslist/browserslist#queries

# For the full list of supported browsers by the Angular framework, please see:
# https://angular.io/guide/browser-support

# You can see what browsers were selected by your queries by running:
#   npx browserslist

last 1 Chrome version
last 1 Firefox version
last 2 Edge major versions
last 2 Safari major versions
last 2 iOS major versions
Firefox ESR
not IE 11 # Angular supports IE 11 only as an opt-in. To opt-in, remove the 'not' prefix on this line.
`;
  writeFileSync(join(dir, file), template);
}

function writeProject(dir: string, name: string, packageName: string, normalizedName: string) {
  const file = 'project.json';
  let template = `{
  "projectType": "application",
  "root": "bundles/{normalizedName}_src",
  "sourceRoot": "bundles/{normalizedName}_src",
  "targets": {
    "build-dev": {
      "executor": "@angular-builders/custom-webpack:browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "index": "",
        "main": "",
        "assets": [],
        "outputPath": "dist/bundles/{normalizedName}/dev",
        "tsConfig": "bundles/tsconfig.json",
        "customWebpackConfig": {
          "path": "bundles/{normalizedName}_src/webpack.config.js",
          "libraryName": "{name}",
          "libraryTarget": "umd"
        },
        "outputHashing": "none",
        "buildOptimizer": false,
        "optimization": false,
        "vendorChunk": true,
        "extractLicenses": false,
        "sourceMap": true,
        "namedChunks": true
      }
    },
    "build-prod": {
      "executor": "@angular-builders/custom-webpack:browser",
      "outputs": ["{options.outputPath}"],
      "options": {
        "index": "",
        "main": "",
        "assets": [],
        "outputPath": "dist/bundles/{normalizedName}/prod",
        "tsConfig": "bundles/tsconfig.json",
        "customWebpackConfig": {
          "path": "bundles/{normalizedName}_src/webpack.config.js",
          "libraryName": "{name}",
          "libraryTarget": "umd"
        },
        "outputHashing": "none",
        "budgets": [
          {
            "type": "initial",
            "maximumWarning": "500kb",
            "maximumError": "1mb"
          },
          {
            "type": "anyComponentStyle",
            "maximumWarning": "2kb",
            "maximumError": "4kb"
          }
        ]
      }
    },
    "build": {
      "executor": "@nrwl/workspace:run-commands",
      "options": {
        "commands": ["nx build-dev {normalizedName}", "nx build-prod {normalizedName}"],
        "parallel": true
      }
    },
    "publish-npm": {
      "executor": "@nrwl/workspace:run-commands",
      "options": {
        "commands": ["yarn publish:npm --name={name} --package-name={packageName} --publish"],
        "parallel": false
      }
    }
  }
}
`;
  template = template
    .replace(/{name}/g, name)
    .replace(/{packageName}/g, packageName)
    .replace(/{normalizedName}/g, normalizedName);
  writeFileSync(join(dir, file), template);
}

function writeWebpack(dir: string, name: string, packageName: string, normalizedName: string, externals: string[]) {
  const file = 'webpack.config.js';
  let template = `const { singleSpaAngularWebpack } = require('../single-spa-webpack');

  require('{packageName}');

  module.exports = (config, options) => {
    const custom = singleSpaAngularWebpack(config, options);
    const filename = '{normalizedName}';

    custom.entry = {
      '{name}': '{name}'
    };
    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';
    custom.externals.push({externals});

    return custom;
  };
`;
  template = template
    .replace(/{name}/g, name)
    .replace(/{packageName}/g, packageName)
    .replace(/{normalizedName}/g, normalizedName)
    .replace(/{externals}/g, externals.map(e => `'${e}'`).join(', '));
  writeFileSync(join(dir, file), template);
}

function updateAngularJson(normalizedName: string) {
  const file = join(cwd(), 'angular.json');
  const angularJson = require(file);
  angularJson.projects[normalizedName] = `bundles/${normalizedName}_src`;
  // Sort projects
  angularJson.projects = sortObject(angularJson.projects);
  writeFileSync(file, JSON.stringify(angularJson, null, 2));
}

export function writeBundle(entry) {
  if (!existsSync(entry.src)) {
    mkdirSync(entry.src, { recursive: true });
  }

  writeBrowser(entry.src);
  writeProject(entry.src, entry.name, entry.packageName, entry.normalizedName);
  writeWebpack(entry.src, entry.name, entry.packageName, entry.normalizedName, entry.externals);
  updateAngularJson(entry.normalizedName);
}
export function writePackageJson(dir: string, name: string, normalizedName: string, version: string, hash = null) {
  const file = 'package.json';
  let template = `{
  "name": "@ez-microfrontend/{normalizedName}",
  "version": "{version}",
  "description": "The single-spa UMD bundles for {name}",
  "license": "MIT",
  "publishConfig": {
      "registry": "https://registry.npmjs.org"
  },
  "repository": {
      "type": "git",
      "url": "https://github.com/rwxrwx-rwx/microfrontend-bundles.git"
  },
  "homepage": "https://github.com/rwxrwx-rwx/microfrontend-bundles/blob/master/README.md",
  "author": "Kay - Khanh Bùi <khanhbui.lab@gmail.com>",
  "dependencies": {},
  "bugs": {
      "url": "https://github.com/rwxrwx-rwx/microfrontend-bundles/issues"
  },
  "packageName": "{name}"
}
`;
  template = template
    .replace(/{name}/g, name)
    .replace(/{normalizedName}/g, normalizedName)
    .replace(/{version}/g, version);
  if (hash) {
    const json = JSON.parse(template);
    json.hash = hash;
    template = JSON.stringify(json, null, 2);
  }
  writeFileSync(join(dir, file), template);
}
