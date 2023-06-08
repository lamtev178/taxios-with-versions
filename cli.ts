#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { copyFile } from 'node:fs/promises';
import { writeFileSync } from 'fs';
import { mkdirp } from 'mkdirp';
import nodePath from 'path';
import minimist from 'minimist';
import 'dotenv/config'

process.argv.forEach((el, index) => {
    if(process.env[`${el}`]){
        process.argv[index] = process.env[`${el}`] as string
    }
})

const args = process.argv.slice(2);

type Argv = {
  out: string;
  export?: string;
  help: boolean;
  'package-version': string;
};
const argv = minimist<Argv>(args, {
  string: ['out', 'export', 'package-version'],
  alias: {
    out: ['o'],
    export: ['e'],
  },
});

const packageVersion = argv['package-version'];
const outputPath = argv.out;
const inputPath = argv._[0];

if (!packageVersion) {
  console.error('You have to specify package-version');
  process.exit(1);
}

args.splice(
  args.findIndex((el) => el === '--package-version'),
  2,
);

execSync(`taxios-generate ${args.join(' ')}`);

async function main() {
  try {
    await mkdirp(nodePath.dirname(`typesPackage/${outputPath}`));

    await copyFile(outputPath, `typesPackage/${outputPath}`);

    writeFileSync('./typesPackage/package.json', JSON.stringify(config), 'utf8');
    execSync(`cd typesPackage && npm publish`);
  } catch (error) {
    console.log('An error has occurred ', error);
  }
}

main();

const config = {
  name: `taxios_${inputPath.split('//')[1].split('/')[0]}`,
  version: packageVersion,
};
