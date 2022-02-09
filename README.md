# Capact Dashboard

This repository contains the source code for Dashboard, the Capact UI, and additional development packages.

## Componets

There are the following components:

- [Capact Dashboard UI](dashboard) - complete web-based UI for Capact resources management. Released as a Docker image.
- [Capact Dashboard Components](packages/dashboard-components) - React.js components library for custom UI development. Released as a npm package.

## Development

### Prerequisites

The following prerequisites are mandatory across all applications:

- [Node.js 17](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.

Some of the packages may have additional prerequisites. See the corresponding Readme documents for details.

### Install dependencies

Run the following commands:

```bash
npm install
npm run bootstrap
```

Now you are ready to develop one of the packages!

### Run development mode

To run Dashboard with all related packages, run:

```bash
npm start
```

This command watches for changes to Dashboard of any related packages to build them and live reload the page.

### Test packages

Runs tests in all packages, run:

```bash
npm run test
```

### Lint packages

To lint the source code of all packages, run:

```bash
npm run lint
```

### Build packages

To build all packages, run:

```bash
npm run build
```

### Publish packages

To publish all public packages, on run:

```bash
npm run publish
```

### Other commands

#### `npm run setup-hooks`

Configures Git hooks in order to run Prettier for every modified file. It is run automatically as a part of the `npm install`.

#### `npm run docker:build`

Builds Docker image for all packages which exposes such functionality. It uses already built application.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)

#### `npm run docker:push`

Pushes the built Docker images.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)

#### `npm run docker:save`

Saves already built Docker images in a given directory to the archives in the format `{app-name}.tar`.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)
- `DOCKER_IMAGES_DIR` (default: `/tmp/dashboard-images`)

This command is used on the GitHub Actions pipeline for pull request build.

#### `npm run docker:load`

Loads already built Docker images from a given directory, where the `{app-name}.tar` archives resides.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)
- `DOCKER_IMAGES_DIR` (default: `/tmp/dashboard-images`)

This command is used on the GitHub Actions pipeline for pull request build.

#### `npm run prettify`

Reformats all source files.

> **NOTE:** You don't need to run this command if you have configured [git hooks](#npm-run-setup-hooks).
