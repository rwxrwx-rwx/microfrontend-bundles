"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_entry_points_1 = require("./find-entry-points");
var template_1 = require("./template");
var colors = require("colors");
var entryPoints = find_entry_points_1.findEntryPoints();
for (var _i = 0, entryPoints_1 = entryPoints; _i < entryPoints_1.length; _i++) {
    var entry = entryPoints_1[_i];
    if (entry.skipBuild) {
        continue;
    }
    template_1.writeBundle(entry);
    console.log(colors.cyan("Generated: " + entry.name));
}
//# sourceMappingURL=generate.js.map