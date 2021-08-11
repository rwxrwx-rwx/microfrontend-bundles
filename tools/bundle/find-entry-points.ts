import * as path from 'path';
import * as minimatch from 'minimatch';
import { join } from 'path';
import { cwd } from 'process';
import { getSharedSetup } from '@angular/compiler-cli/ngcc/src/ngcc_options';
import { EntryPointManifest } from '@angular/compiler-cli/ngcc/src/packages/entry_point_manifest';
import { NgccConfiguration } from '@angular/compiler-cli/ngcc/src/packages/configuration';
import { setFileSystem, NodeJSFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
import { EntryPointWithDependencies } from '@angular/compiler-cli/ngcc/src/dependencies/dependency_host';
import { DepGraph } from 'dependency-graph';
import { EntryPoint } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import { normalize } from './utils';

const { dependencies, mf } = require(join(cwd(), 'package.json'));
const skipDependencies = [
  'rxjs/ajax',
  'rxjs/fetch',
  'rxjs/internal-compatibility',
  'rxjs/testing',
  'rxjs/webSocket',
  '@angular/cdk/testing/protractor',
  '@angular/cdk/testing/selenium-webdriver',
  '@angular/cdk/testing/testbed',
  '@firebase/storage-exp',
  ...(mf.skipDependencies || [])
];
const entryPointFilterFn = (e: EntryPointWithDependencies) =>
  (Object.keys(dependencies).some(d => d === e.entryPoint.packageName) ||
    (e.entryPoint.name && (e.entryPoint.name.startsWith('@firebase') || e.entryPoint.name.startsWith('firebase')))) &&
  !skipDependencies.some(p => p === e.entryPoint.name) &&
  !minimatch(e.entryPoint.name, '**/+(testing|upgrade)') &&
  !minimatch(e.entryPoint.path, '**/node_modules/**/node_modules/**');

export function findEntryPoints() {
  // Find entry points
  setFileSystem(new NodeJSFileSystem());
  const { logger, fileSystem, absBasePath, projectPath } = getSharedSetup({
    basePath: path.resolve('node_modules')
  });
  const config = new NgccConfiguration(fileSystem, projectPath);
  const entryPointManifest = new EntryPointManifest(fileSystem, config, logger);
  const entryPoints = entryPointManifest.readEntryPointsUsingManifest(absBasePath).filter(entryPointFilterFn);

  // Compute dependency graph
  const graph = new DepGraph<EntryPoint>();

  entryPoints.forEach(e =>
    graph.addNode(e.entryPoint.name, {
      ...e.entryPoint,
      skipBuild: (mf.skipBuildDependencies || []).some((s: string) => s === e.entryPoint.name)
    })
  );
  entryPoints.forEach(({ entryPoint, depInfo: { dependencies } }) => {
    const rootPackageJson = graph.getNodeData(entryPoint.packageName)?.packageJson;
    const dependenciesFromPackageJson = [
      ...Object.keys(rootPackageJson?.dependencies || []),
      ...Object.keys(rootPackageJson?.peerDependencies || [])
    ];
    const deepDependencies = Array.from(dependencies).map(d => {
      let foundPackageName = entryPoints.find(e => e.entryPoint.path === d)?.entryPoint.name;
      if (!foundPackageName) {
        const withoutInternalNodeModulePath = d.replace(`/node_modules/${entryPoint.packageName}/`, '/');
        foundPackageName = entryPoints.find(e => e.entryPoint.path === withoutInternalNodeModulePath)?.entryPoint.name;
      }
      return foundPackageName;
    });
    [...deepDependencies, ...dependenciesFromPackageJson].forEach(d => {
      if (graph.hasNode(d)) {
        graph.addDependency(entryPoint.name, d);
      }
    });
  });

  return graph.overallOrder().map(e => {
    const normalizedName = normalize(e);
    return {
      ...graph.getNodeData(e),
      externals: graph.dependenciesOf(e),
      normalizedName,
      src: `bundles/${normalizedName}_src`
    };
  }) as EntryPoint[];
}
