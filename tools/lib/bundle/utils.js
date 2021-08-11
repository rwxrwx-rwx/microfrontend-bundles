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
exports.sleep = exports.run = exports.moveFiles = exports.normalize = exports.sortObject = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
function sortObject(unordered) {
    return Object.keys(unordered)
        .sort()
        .reduce(function (obj, key) {
        obj[key] = unordered[key];
        return obj;
    }, {});
}
exports.sortObject = sortObject;
function normalize(name) {
    if (name.startsWith('@firebase')) {
        return name.replace('@', 'at-').replace(/\//g, '-');
    }
    return name.replace('@', '').replace(/\//g, '-');
}
exports.normalize = normalize;
function moveFiles(src, dest) {
    if (!fs_1.existsSync(src)) {
        return;
    }
    var files = fs_1.readdirSync(src);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        fs_1.renameSync(path_1.join(src, file), path_1.join(dest, file));
    }
    fs_1.rmdirSync(src);
}
exports.moveFiles = moveFiles;
function run(command, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (rs, rj) {
                    var e = child_process_1.exec(command, options);
                    e.stdout.on('data', console.log);
                    e.stderr.on('data', console.error);
                    e.on('close', function (code) {
                        if (code === 0) {
                            rs('');
                        }
                        else {
                            rj('Error occurs with code ' + code);
                        }
                    });
                })];
        });
    });
}
exports.run = run;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
exports.sleep = sleep;
//# sourceMappingURL=utils.js.map