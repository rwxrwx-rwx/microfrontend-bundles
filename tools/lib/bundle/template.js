"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePackageJson = exports.writeBundle = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var utils_1 = require("./utils");
function writeBrowser(dir) {
    var file = '.browserslistrc';
    var template = "# This file is used by the build system to adjust CSS and JS output to support the specified browsers below.\n# For additional information regarding the format and rule options, please see:\n# https://github.com/browserslist/browserslist#queries\n\n# For the full list of supported browsers by the Angular framework, please see:\n# https://angular.io/guide/browser-support\n\n# You can see what browsers were selected by your queries by running:\n#   npx browserslist\n\nlast 1 Chrome version\nlast 1 Firefox version\nlast 2 Edge major versions\nlast 2 Safari major versions\nlast 2 iOS major versions\nFirefox ESR\nnot IE 11 # Angular supports IE 11 only as an opt-in. To opt-in, remove the 'not' prefix on this line.\n";
    fs_1.writeFileSync(path_1.join(dir, file), template);
}
function writeProject(dir, name, packageName, normalizedName) {
    var file = 'project.json';
    var template = "{\n  \"projectType\": \"application\",\n  \"root\": \"bundles/{normalizedName}_src\",\n  \"sourceRoot\": \"bundles/{normalizedName}_src\",\n  \"targets\": {\n    \"build-dev\": {\n      \"executor\": \"@angular-builders/custom-webpack:browser\",\n      \"outputs\": [\"{options.outputPath}\"],\n      \"options\": {\n        \"index\": \"\",\n        \"main\": \"\",\n        \"assets\": [],\n        \"outputPath\": \"dist/bundles/{normalizedName}/dev\",\n        \"tsConfig\": \"bundles/tsconfig.json\",\n        \"customWebpackConfig\": {\n          \"path\": \"bundles/{normalizedName}_src/webpack.config.js\",\n          \"libraryName\": \"{name}\",\n          \"libraryTarget\": \"umd\"\n        },\n        \"outputHashing\": \"none\",\n        \"buildOptimizer\": false,\n        \"optimization\": false,\n        \"vendorChunk\": true,\n        \"extractLicenses\": false,\n        \"sourceMap\": true,\n        \"namedChunks\": true\n      }\n    },\n    \"build-prod\": {\n      \"executor\": \"@angular-builders/custom-webpack:browser\",\n      \"outputs\": [\"{options.outputPath}\"],\n      \"options\": {\n        \"index\": \"\",\n        \"main\": \"\",\n        \"assets\": [],\n        \"outputPath\": \"dist/bundles/{normalizedName}/prod\",\n        \"tsConfig\": \"bundles/tsconfig.json\",\n        \"customWebpackConfig\": {\n          \"path\": \"bundles/{normalizedName}_src/webpack.config.js\",\n          \"libraryName\": \"{name}\",\n          \"libraryTarget\": \"umd\"\n        },\n        \"outputHashing\": \"none\",\n        \"budgets\": [\n          {\n            \"type\": \"initial\",\n            \"maximumWarning\": \"500kb\",\n            \"maximumError\": \"1mb\"\n          },\n          {\n            \"type\": \"anyComponentStyle\",\n            \"maximumWarning\": \"2kb\",\n            \"maximumError\": \"4kb\"\n          }\n        ]\n      }\n    },\n    \"build\": {\n      \"executor\": \"@nrwl/workspace:run-commands\",\n      \"options\": {\n        \"commands\": [\"nx build-dev {normalizedName}\", \"nx build-prod {normalizedName}\"],\n        \"parallel\": true\n      }\n    },\n    \"publish-npm\": {\n      \"executor\": \"@nrwl/workspace:run-commands\",\n      \"options\": {\n        \"commands\": [\"yarn publish:npm --name={name} --package-name={packageName} --publish\"],\n        \"parallel\": false\n      }\n    }\n  }\n}\n";
    template = template
        .replace(/{name}/g, name)
        .replace(/{packageName}/g, packageName)
        .replace(/{normalizedName}/g, normalizedName);
    fs_1.writeFileSync(path_1.join(dir, file), template);
}
function writeWebpack(dir, name, packageName, normalizedName, externals) {
    var file = 'webpack.config.js';
    var template = "const { singleSpaAngularWebpack } = require('../single-spa-webpack');\n\n  require('{packageName}');\n\n  module.exports = (config, options) => {\n    const custom = singleSpaAngularWebpack(config, options);\n    const filename = '{normalizedName}';\n\n    custom.entry = {\n      '{name}': '{name}'\n    };\n    custom.output.filename = filename + '.umd' + (config.mode === 'development' ? '' : '.min') + '.js';\n    custom.externals.push({externals});\n\n    return custom;\n  };\n";
    template = template
        .replace(/{name}/g, name)
        .replace(/{packageName}/g, packageName)
        .replace(/{normalizedName}/g, normalizedName)
        .replace(/{externals}/g, externals.map(function (e) { return "'" + e + "'"; }).join(', '));
    fs_1.writeFileSync(path_1.join(dir, file), template);
}
function updateAngularJson(normalizedName) {
    var file = path_1.join(process_1.cwd(), 'angular.json');
    var angularJson = require(file);
    angularJson.projects[normalizedName] = "bundles/" + normalizedName + "_src";
    // Sort projects
    angularJson.projects = utils_1.sortObject(angularJson.projects);
    fs_1.writeFileSync(file, JSON.stringify(angularJson, null, 2));
}
function writeBundle(entry) {
    if (!fs_1.existsSync(entry.src)) {
        fs_1.mkdirSync(entry.src, { recursive: true });
    }
    writeBrowser(entry.src);
    writeProject(entry.src, entry.name, entry.packageName, entry.normalizedName);
    writeWebpack(entry.src, entry.name, entry.packageName, entry.normalizedName, entry.externals);
    updateAngularJson(entry.normalizedName);
}
exports.writeBundle = writeBundle;
function writePackageJson(dir, name, normalizedName, version, hash) {
    if (hash === void 0) { hash = null; }
    var file = 'package.json';
    var template = "{\n  \"name\": \"@ez-microfrontend/{normalizedName}\",\n  \"version\": \"{version}\",\n  \"description\": \"The single-spa UMD bundles for {name}\",\n  \"license\": \"MIT\",\n  \"publishConfig\": {\n      \"registry\": \"https://registry.npmjs.org\"\n  },\n  \"repository\": {\n      \"type\": \"git\",\n      \"url\": \"https://github.com/rwxrwx-rwx/microfrontend-bundles.git\"\n  },\n  \"homepage\": \"https://github.com/rwxrwx-rwx/microfrontend-bundles/blob/master/README.md\",\n  \"author\": \"Kay - Khanh B\u00F9i <khanhbui.lab@gmail.com>\",\n  \"dependencies\": {},\n  \"bugs\": {\n      \"url\": \"https://github.com/rwxrwx-rwx/microfrontend-bundles/issues\"\n  },\n  \"packageName\": \"{name}\"\n}\n";
    template = template
        .replace(/{name}/g, name)
        .replace(/{normalizedName}/g, normalizedName)
        .replace(/{version}/g, version);
    if (hash) {
        var json = JSON.parse(template);
        json.hash = hash;
        template = JSON.stringify(json, null, 2);
    }
    fs_1.writeFileSync(path_1.join(dir, file), template);
}
exports.writePackageJson = writePackageJson;
//# sourceMappingURL=template.js.map