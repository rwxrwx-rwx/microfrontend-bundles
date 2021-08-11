import * as colors from 'colors';
import { readFileSync } from 'fs';
import { join, resolve, basename, dirname, sep } from 'path';
import { cwd } from 'process';
import { sha1Binary } from './sha1';
import { writePackageJson } from './template';
import { moveFiles, normalize, run, sleep } from './utils';
import * as parser from 'yargs-parser';
import * as glob from 'glob';

const argv = parser(process.argv.slice(2));
const name = argv.name;
const packageName = argv.packageName;
const normalizedName = normalize(name);
const dist = `dist/bundles/${normalizedName}`;
let version = require(join(cwd(), 'package.json')).dependencies[packageName];

if (!version) {
  version = require(join(cwd(), `node_modules/${name}/package.json`)).version;
}

(async () => {
  const hash = {
    dev: {},
    prod: {}
  };
  for (const js of glob.sync(join(dist, '**/*.js'))) {
    const file = resolve(js);
    const filename = basename(file);
    const parts = dirname(file).split(sep);
    try {
      hash[parts[parts.length - 1]][filename] = await sha1Binary(readFileSync(join(file)));
    } catch {}
  }

  moveFiles(join(dist, 'dev'), dist);
  moveFiles(join(dist, 'prod'), dist);
  writePackageJson(dist, name, normalizedName, version, hash);

  if (argv.publish) {
    await run('npm publish --access public', { cwd: resolve(dist) });
    await sleep(1000);
  }

  console.log(colors.green(`Published ${name} successfully!`));
})();
