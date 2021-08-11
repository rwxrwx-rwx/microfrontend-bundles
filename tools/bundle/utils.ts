import { exec } from 'child_process';
import { readdirSync, renameSync, rmdirSync, existsSync } from 'fs';
import { join } from 'path';

export function sortObject(unordered) {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
}

export function normalize(name: string) {
  if (name.startsWith('@firebase')) {
    return name.replace('@', 'at-').replace(/\//g, '-');
  }
  return name.replace('@', '').replace(/\//g, '-');
}

export function moveFiles(src: string, dest: string) {
  if (!existsSync(src)) {
    return;
  }

  const files = readdirSync(src);

  for (const file of files) {
    renameSync(join(src, file), join(dest, file));
  }
  rmdirSync(src);
}

export async function run(command, options = {}) {
  return new Promise((rs, rj) => {
    const e = exec(command, options);

    e.stdout.on('data', console.log);
    e.stderr.on('data', console.error);
    e.on('close', code => {
      if (code === 0) {
        rs('');
      } else {
        rj('Error occurs with code ' + code);
      }
    });
  });
}

export async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
