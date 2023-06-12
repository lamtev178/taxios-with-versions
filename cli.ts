#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { copyFile } from 'node:fs/promises';
import { writeFileSync } from 'fs';
import { mkdirp } from 'mkdirp';
import nodePath from 'path';
import minimist from 'minimist';
import 'dotenv/config';
import { replaceVariablesFromEnv, removeVersionFlags } from './utils';

replaceVariablesFromEnv(process.argv);

const args = process.argv.slice(2);
const argsVersionsList = ['--package-version', '--package-name', '--registry'];

type Argv = {
  out: string;
  export?: string;
  help: boolean;
  'package-version': string;
  'package-name'?: string;
  registry?: string;
};
const argv = minimist<Argv>(args, {
  string: ['out', 'export', 'package-version', 'package-name', 'registry'],
  alias: {
    out: ['o'],
    export: ['e'],
  },
});

const packageVersion = argv['package-version'];
const outputPath = argv.out;
const inputPath = argv._[0];
const registry = argv.registry;
const packageName = argv['package-name'] ? argv['package-name'] : `taxios_${inputPath.split('//')[1].split('/')[0]}`;

if (!packageVersion) {
  console.error('You have to specify package-version');
  process.exit(1);
}

removeVersionFlags(args, argsVersionsList);

console.log(args);

// execSync(`taxios-generate ${args.join(' ')}`);

// async function main() {
//   try {
//     await mkdirp(nodePath.dirname(`typesPackage/${outputPath}`));

//     await copyFile(outputPath, `typesPackage/${outputPath}`);

//     if (registry) {
//       writeFileSync('./typesPackage/.npmrc', registry);
//     }

//     writeFileSync('./typesPackage/package.json', JSON.stringify(config));
//     execSync(`cd typesPackage && npm publish`);
//     console.log('Succes publish', packageName);
//   } catch (error) {
//     console.error('An error has occurred ', error);
//   }
// }

// main();

// const config = {
//   name: packageName,
//   version: packageVersion,
// };
