"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEntryPoints = void 0;
var path = require("path");
var minimatch = require("minimatch");
var path_1 = require("path");
var process_1 = require("process");
var ngcc_options_1 = require("@angular/compiler-cli/ngcc/src/ngcc_options");
var entry_point_manifest_1 = require("@angular/compiler-cli/ngcc/src/packages/entry_point_manifest");
var configuration_1 = require("@angular/compiler-cli/ngcc/src/packages/configuration");
var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
var dependency_graph_1 = require("dependency-graph");
var utils_1 = require("./utils");
var _a = require(path_1.join(process_1.cwd(), 'package.json')), dependencies = _a.dependencies, mf = _a.mf;
var skipDependencies = __spreadArray([
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/internal-compatibility',
    'rxjs/testing',
    'rxjs/webSocket',
    '@angular/cdk/testing/protractor',
    '@angular/cdk/testing/selenium-webdriver',
    '@angular/cdk/testing/testbed',
    '@firebase/storage-exp'
], (mf.skipDependencies || []));
var entryPointFilterFn = function (e) {
    return (Object.keys(dependencies).some(function (d) { return d === e.entryPoint.packageName; }) ||
        (e.entryPoint.name && (e.entryPoint.name.startsWith('@firebase') || e.entryPoint.name.startsWith('firebase')))) &&
        !skipDependencies.some(function (p) { return p === e.entryPoint.name; }) &&
        !minimatch(e.entryPoint.name, '**/+(testing|upgrade)') &&
        !minimatch(e.entryPoint.path, '**/node_modules/**/node_modules/**');
};
function findEntryPoints() {
    // Find entry points
    file_system_1.setFileSystem(new file_system_1.NodeJSFileSystem());
    var _a = ngcc_options_1.getSharedSetup({
        basePath: path.resolve('node_modules')
    }), logger = _a.logger, fileSystem = _a.fileSystem, absBasePath = _a.absBasePath, projectPath = _a.projectPath;
    var config = new configuration_1.NgccConfiguration(fileSystem, projectPath);
    var entryPointManifest = new entry_point_manifest_1.EntryPointManifest(fileSystem, config, logger);
    var entryPoints = entryPointManifest.readEntryPointsUsingManifest(absBasePath).filter(entryPointFilterFn);
    // Compute dependency graph
    var graph = new dependency_graph_1.DepGraph();
    entryPoints.forEach(function (e) {
        return graph.addNode(e.entryPoint.name, __assign(__assign({}, e.entryPoint), { skipBuild: (mf.skipBuildDependencies || []).some(function (s) { return s === e.entryPoint.name; }) }));
    });
    entryPoints.forEach(function (_a) {
        var _b;
        var entryPoint = _a.entryPoint, dependencies = _a.depInfo.dependencies;
        var rootPackageJson = (_b = graph.getNodeData(entryPoint.packageName)) === null || _b === void 0 ? void 0 : _b.packageJson;
        var dependenciesFromPackageJson = __spreadArray(__spreadArray([], Object.keys((rootPackageJson === null || rootPackageJson === void 0 ? void 0 : rootPackageJson.dependencies) || [])), Object.keys((rootPackageJson === null || rootPackageJson === void 0 ? void 0 : rootPackageJson.peerDependencies) || []));
        var deepDependencies = Array.from(dependencies).map(function (d) {
            var _a, _b;
            var foundPackageName = (_a = entryPoints.find(function (e) { return e.entryPoint.path === d; })) === null || _a === void 0 ? void 0 : _a.entryPoint.name;
            if (!foundPackageName) {
                var withoutInternalNodeModulePath_1 = d.replace("/node_modules/" + entryPoint.packageName + "/", '/');
                foundPackageName = (_b = entryPoints.find(function (e) { return e.entryPoint.path === withoutInternalNodeModulePath_1; })) === null || _b === void 0 ? void 0 : _b.entryPoint.name;
            }
            return foundPackageName;
        });
        __spreadArray(__spreadArray([], deepDependencies), dependenciesFromPackageJson).forEach(function (d) {
            if (graph.hasNode(d)) {
                graph.addDependency(entryPoint.name, d);
            }
        });
    });
    return graph.overallOrder().map(function (e) {
        var normalizedName = utils_1.normalize(e);
        return __assign(__assign({}, graph.getNodeData(e)), { externals: graph.dependenciesOf(e), normalizedName: normalizedName, src: "bundles/" + normalizedName + "_src" });
    });
}
exports.findEntryPoints = findEntryPoints;
//# sourceMappingURL=find-entry-points.js.map