# Dashboard

This directory contains source code for the Capact Dashboard.
Dashboard is a general purpose, web-based UI for Capact cluster. It allows users to manage Capact resources running in the target cluster. It is an official alternative for [CLI](https://capact.io/docs/cli/getting-started).

## Prerequisites

- [Capact cluster](https://capact.io/docs/next/installation) created.

  > **NOTE**: Currently, only the local version is supported. Use the latest Capact CLI and install Capact from the latest `main` branch.
  >
  > `capact install --helm-repo=@latest --version=@latest`

- [Node.js 17](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed.
- Installed dependencies according to the [Install dependencies](../README.md#install-dependencies) section from the main Readme.

## Development

1. Run development mode according to the [Run development mode](../README.md#run-development-mode) section from the main Readme.

> **NOTE:** Alternatively, you can build all dependencies by [building all packages](../README.md#build-packages) and running [`npm start`](#npm-start) command in the `dashboard` directory.

1. **(Optional)** To be able to use Argo Workflows UI link on Action details view, make the Argo Workflows UI accessible:

```bash
kubectl -n capact-system port-forward svc/argo-argo-workflows-server 2746
```

1. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Other Commands

The application has been initialized using [Create React App](https://create-react-app.dev/). In the project directory, you can run:

#### `npm start`

Runs the app in the development mode. It requires production builds for all dependencies.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Runs tests in the directory.

#### `npm test:watch`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run docker:build`

Builds the Docker image based on already built application with `npm run build`.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)

#### `npm run docker:push`

Pushes the Docker image.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)

#### `npm run docker:save`

Saves an already built Docker image in a given directory to the `dashboard.tar` archive.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)
- `DOCKER_IMAGES_DIR` (default: `/tmp/dashboard-images`)

This command is used on the GitHub Actions pipeline for pull request build.

#### `npm run docker:load`

Loads an already built Docker image from a given directory, where an `dashboard.tar` archive resides.

Supported environmental variables:

- `DOCKER_REPOSITORY` (default: `ghcr.io/capactio`)
- `DOCKER_TAG` (default: `latest`)
- `DOCKER_IMAGES_DIR` (default: `/tmp/dashboard-images`)

This command is used on the GitHub Actions pipeline for pull request build.

## Configuration

The application can be configured in runtime using configuration file, which should be mounted under `public/config/runtime.js` file. It should have the following content:

```js
window.RuntimeConfig = {
  // configuration properties with its values
};
```

To learn about the available configuration properties and theirs default values, see the [`src/config/runtime.ts`](src/config/runtime.ts) file.

### Run built Docker image

To run built Docker image with the [`npm run docker:build` command](#npm-run-dockerbuild), execute:

```bash
docker run --rm -it -p 3000:8080 ghcr.io/capactio/dashboard:latest
```

> **NOTE:** To test the `/healthz` endpoint, add `-p 3001:8082` to the `docker run` command. Once the container is run, you can call the `http://localhost:3001/healthz` endpoint.

To access Dashboard, open [http://127.0.0.1:3000](http://127.0.0.1:3000).
