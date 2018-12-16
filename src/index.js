#!/usr/bin/env node
const yargs = require('yargs');
const { join } = require('path');
const { spawnScript } = require('./utils');

const renderCLI = () => yargs
  .usage('$0 <cmd> [args]')
  .command('travis-after-success', 'release a package', () => {
    const args = process.argv.slice(3);

    spawnScript(
      join(__dirname, 'scripts', 'travis-after-success'),
      args,
    );
  })
  .help()
  .argv;

renderCLI();
