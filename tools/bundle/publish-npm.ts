import * as colors from 'colors';
import { readFileSync } from 'fs';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { sha1Binary } from './sha1';
import { writePackageJson } from './template';
import { moveFiles, normalize, run, sleep } from './utils';
import * as parser from 'yargs-parser';

const argv = parser(process.argv.slice(2));
const name = argv.name;
const packageName = argv.packageName;
const normalizedName = normalize(name);
const dist = `dist/bundles/${normalizedName}`;
const version = require(join(cwd(), 'package.json')).dependencies[packageName];

(async () => {
  moveFiles(join(dist, 'dev'), dist);
  moveFiles(join(dist, 'prod'), dist);

  const hash = {
    dev: sha1Binary(readFileSync(join(dist, normalizedName + '.umd.js'))),
    prod: sha1Binary(readFileSync(join(dist, normalizedName + '.umd.min.js')))
  };
  writePackageJson(dist, name, normalizedName, version, hash);

  if (argv.publish) {
    await run('npm publish --access public', { cwd: resolve(dist) });
    await sleep(1000);
  }

  console.log(colors.green(`Published ${name} successfully!`));
})();
