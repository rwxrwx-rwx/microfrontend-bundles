import { findEntryPoints } from './find-entry-points';
import * as colors from 'colors';
import { writeFileSync } from 'fs';

const entryPoints = findEntryPoints();
const imports = {
  imports: {}
};

for (const entry of entryPoints) {
  if (entry.skipBuild) {
    continue;
  }

  imports.imports[entry.name] = `https://cdn.jsdelivr.net/npm/@ez-microfrontend/${entry.normalizedName}/${entry.normalizedName}.umd.js`;
}
writeFileSync('import-map.json', JSON.stringify(imports, null, 2));
console.log(colors.cyan(`Setup import-map successfully!`));
