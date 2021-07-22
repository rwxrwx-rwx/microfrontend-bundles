import { execSync } from 'child_process';
import * as github from 'gh-release';
import * as glob from 'glob';
import * as path from 'path';
import * as colors from 'colors';

async function publish(options) {
  return new Promise((rs, rj) => {
    github(options, (err, res) => {
      if (err) {
        rj(err);
      } else {
        rs(res);
      }
    });
  });
}

(async () => {
  const packages = glob
    .sync('dist/bundles/**/package.json')
    .sort()
    .map(p => {
      const packageJson = require(path.resolve(p));
      return `| ${packageJson.packageName} | ${packageJson.version} |`;
    })
    .join('\r\n');

  if (!packages.length) {
    console.log(colors.yellow('Skip Github publishing since no bundles have changed!'));
    return;
  }

  const f0 = n => ('0' + n).slice(-2);
  const date = new Date();
  const y = date.getFullYear();
  const m = f0(date.getMonth());
  const d = f0(date.getDay());
  const h = f0(date.getHours());
  const min = f0(date.getMinutes());
  const s = f0(date.getSeconds());
  const commit = execSync('git rev-parse HEAD').toString().trim();
  const body = `

### Commit: ${commit}

### Bundles

| Name | Version |
| --- | --- |
${packages}
`;
  const options = {
    tag_name: `${y}_${m}_${d}__${h}_${min}_${s}`,
    name: `Release - ${y}-${m}-${d} ${h}:${min}:${s}`,
    body,
    target_commitish: commit,
    draft: false,
    owner: 'rwxrwx-rwx',
    endpoint: 'https://api.github.com',
    auth: { token: process.env.GITHUB_TOKEN }
  };
  await publish(options);
  console.log(colors.green('Publish Github successfully!'));
})();
