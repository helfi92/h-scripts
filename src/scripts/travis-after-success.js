const spawn = require('cross-spawn');
const { pkg } = require('../utils');

function runAfterSuccessScripts() {
  const { TRAVIS_BRANCH, TRAVIS_PULL_REQUEST, TRAVIS } = process.env;
  const autorelease = pkg.version === '0.0.0-semantically-released'
    && (TRAVIS === "true" || TRAVIS === true)
    && (TRAVIS_PULL_REQUEST === "false" || TRAVIS_PULL_REQUEST === false)
    && TRAVIS_BRANCH === 'master';

  if (!autorelease) {
    console.log('No need to autorelease. Skipping travis-after-success script...');
  } else {
    spawn.sync('echo', ['installing semantic-release'], { stdio: 'inherit' });
    // Install and cache. Run binary later.
    spawn.sync('npx', ['-p', 'semantic-release@15'], { stdio: 'ignore' });

    console.log('running semantic-release');

    const result = spawn.sync('npx', ['-p', 'semantic-release@15', '-c', 'semantic-release'], { stdio: 'inherit' });

    process.exit(result.status);
  }
}

console.log('installing and running travis-deploy-once');
const { status } = spawn.sync('npx', ['travis-deploy-once@5'], { stdio: 'inherit' });

if (status === 0) {
  runAfterSuccessScripts();
} else {
  process.exit(status);
}
