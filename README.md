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

## Inspiration

This is inspired from `kcd-scripts`.
