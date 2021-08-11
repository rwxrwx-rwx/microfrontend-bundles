import { findEntryPoints } from './find-entry-points';
import * as colors from 'colors';
import { writeFileSync } from 'fs';

const entryPoints = findEntryPoints();
const imports = {
  imports: {}
};
const mf = { externals: ['@ezfinhub/shared'] };

for (const entry of entryPoints) {
  mf.externals.push(entry.name);
  if (entry.skipBuild) {
    continue;
  }

  imports.imports[entry.name] = `http://localhost:4200/assets/bundles/${entry.normalizedName}/${entry.normalizedName}.umd.js`;
}
writeFileSync('import-map.json', JSON.stringify(imports, null, 2));
writeFileSync('mf.json', JSON.stringify(mf, null, 2));
console.log(colors.cyan(`Setup import-map successfully!`));
