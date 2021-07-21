import { findEntryPoints } from './find-entry-points';
import { writeBundle } from './template';
import * as colors from 'colors';

const entryPoints = findEntryPoints();

for (const entry of entryPoints) {
  if (entry.skipBuild) {
    continue;
  }

  writeBundle(entry);
  console.log(colors.cyan(`Generated: ${entry.name}`));
}
