"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_entry_points_1 = require("./find-entry-points");
var colors = require("colors");
var fs_1 = require("fs");
var entryPoints = find_entry_points_1.findEntryPoints();
var imports = {
    imports: {}
};
var mf = { externals: ['@ezfinhub/shared'] };
for (var _i = 0, entryPoints_1 = entryPoints; _i < entryPoints_1.length; _i++) {
    var entry = entryPoints_1[_i];
    mf.externals.push(entry.name);
    if (entry.skipBuild) {
        continue;
    }
    imports.imports[entry.name] = "http://localhost:4200/assets/bundles/" + entry.normalizedName + "/" + entry.normalizedName + ".umd.js";
}
fs_1.writeFileSync('import-map.json', JSON.stringify(imports, null, 2));
fs_1.writeFileSync('mf.json', JSON.stringify(mf, null, 2));
console.log(colors.cyan("Setup import-map successfully!"));
//# sourceMappingURL=setup.js.map