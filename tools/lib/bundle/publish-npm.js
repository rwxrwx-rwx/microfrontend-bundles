"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var sha1_1 = require("./sha1");
var template_1 = require("./template");
var utils_1 = require("./utils");
var parser = require("yargs-parser");
var glob = require("glob");
var argv = parser(process.argv.slice(2));
var name = argv.name;
var packageName = argv.packageName;
var normalizedName = utils_1.normalize(name);
var dist = "dist/bundles/" + normalizedName;
var version = require(path_1.join(process_1.cwd(), 'package.json')).dependencies[packageName];
if (!version) {
    version = require(path_1.join(process_1.cwd(), "node_modules/" + name + "/package.json")).version;
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var hash, _i, _a, js, file, filename, parts, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                hash = {
                    dev: {},
                    prod: {}
                };
                _i = 0, _a = glob.sync(path_1.join(dist, '**/*.js'));
                _e.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                js = _a[_i];
                file = path_1.resolve(js);
                filename = path_1.basename(file);
                parts = path_1.dirname(file).split(path_1.sep);
                _e.label = 2;
            case 2:
                _e.trys.push([2, 4, , 5]);
                _b = hash[parts[parts.length - 1]];
                _c = filename;
                return [4 /*yield*/, sha1_1.sha1Binary(fs_1.readFileSync(path_1.join(file)))];
            case 3:
                _b[_c] = _e.sent();
                return [3 /*break*/, 5];
            case 4:
                _d = _e.sent();
                return [3 /*break*/, 5];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                utils_1.moveFiles(path_1.join(dist, 'dev'), dist);
                utils_1.moveFiles(path_1.join(dist, 'prod'), dist);
                template_1.writePackageJson(dist, name, normalizedName, version, hash);
                if (!argv.publish) return [3 /*break*/, 9];
                return [4 /*yield*/, utils_1.run('npm publish --access public', { cwd: path_1.resolve(dist) })];
            case 7:
                _e.sent();
                return [4 /*yield*/, utils_1.sleep(1000)];
            case 8:
                _e.sent();
                _e.label = 9;
            case 9:
                console.log(colors.green("Published " + name + " successfully!"));
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=publish-npm.js.map