const spawn = require('cross-spawn');
const { pkg } = require('../utils');

console.log('installing and running travis-deploy-once');
const { status } = spawn.sync('npx', ['travis-deploy-once@5']);

if (status === 0) {
  runAfterSuccessScripts();
} else {
  process.exit(status);
}

function runAfterSuccessScripts() {
  const { TRAVIS_BRANCH, TRAVIS_PULL_REQUEST, TRAVIS } = process.env;
  const autorelease =
    pkg.version === '0.0.0-semantically-released' &&
    Boolean(TRAVIS) &&
    TRAVIS_PULL_REQUEST === false &&
    TRAVIS_BRANCH === 'master';

  if (!autorelease) {
    console.log('No need to autorelease. Skipping travis-after-success script...');
  } else {
    spawn.sync('echo', ['installing conventional-changelog-eslint'], { stdio: 'inherit' });
    spawn.sync('npx', ['-p', 'conventional-changelog-eslint@3'], { stdio: 'inherit' });

    spawn.sync('echo', ['installing @semantic-release/changelog'], { stdio: 'inherit' });
    spawn.sync('npx', ['-p', '@semantic-release/changelog@3'], { stdio: 'inherit' });

    spawn.sync('echo', ['installing semantic-release'], { stdio: 'inherit' });
    spawn.sync('npx', ['-p', 'semantic-release@15'], { stdio: 'inherit' });
    spawn.sync('echo', ['running semantic-release'], { stdio: 'inherit' });

    const result = spawn.sync('semantic-release', { stdio: 'inherit' });

    process.exit(result.status)
  }
}
