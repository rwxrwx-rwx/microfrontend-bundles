"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_entry_points_1 = require("./find-entry-points");
var colors = require("colors");
var fs_1 = require("fs");
var entryPoints = find_entry_points_1.findEntryPoints();
var imports = {
    imports: {}
};
for (var _i = 0, entryPoints_1 = entryPoints; _i < entryPoints_1.length; _i++) {
    var entry = entryPoints_1[_i];
    if (entry.skipBuild) {
        continue;
    }
    imports.imports[entry.name] = "https://cdn.jsdelivr.net/npm/@ez-microfrontend/" + entry.normalizedName + "/" + entry.normalizedName + ".umd.js";
}
fs_1.writeFileSync('import-map.json', JSON.stringify(imports, null, 2));
console.log(colors.cyan("Setup import-map successfully!"));
//# sourceMappingURL=setup.js.map