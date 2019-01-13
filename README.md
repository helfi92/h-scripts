# h-scripts

This is a CLI that abstracts away all configuration for my open source projects.

## Installation

```bash
yarn add -D h-scripts
```

## Scripts

### travis-after-success

Automate version management and package publishing with Travis.

#### Usage

`travis-after-success` should be used in the `after_success` method.

```yml
dist: trusty
language: node_js
node_js: '10'
install: yarn
script:
  - yarn test
  - yarn build
after_success: h-scripts travis-after-success
```

In order for this method to succeed, make sure to:
* Have `GH_TOKEN` and `NPM_TOKEN` defined in Travis CI
* Have `0.0.0-semantically-released` set as the package version in `package.json`

#### Format of commit messages
By default `semantic-release` uses [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).
I typically like using th [ESLint convention](https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-eslint/README.md) instead.
In order to do so, you will need to alter the preset. One way to do this is via a `.releaserc` file at the root of your project.

_Example: Changing the preset as well as the directory to publish_

```json
{
  "pkgRoot": "build",
  "preset": "eslint"
}
```

## Inspiration

This is inspired from `kcd-scripts`.
