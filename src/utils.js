const spawn = require('cross-spawn');
const readPkgUp = require('read-pkg-up');

const spawnScript = (script, argv) => {
  const done = exitCode => process.exit(exitCode || 0);
  const result = spawn.sync('node', [script, ...argv], { stdio: 'inherit' });

  if (result.signal) {
    done(1);
  } else {
    done(result.status);
  }
};

const { pkg, path: pkgPath } = readPkgUp.sync({
  cwd: process.cwd(),
});

module.exports = {
  spawnScript,
  pkg,
  pkgPath,
};
