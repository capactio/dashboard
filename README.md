# Dashboard

> **🚧* UNDER CONSTRUCTION:**  This project is in an early stage. In the near future, Dashboard will be provided as a part of Capact installation.   

## Overview 

Dashboard is a general purpose, web-based UI for Capact cluster. It allows users to manage Capact resources running in the target cluster. It is an official alternative for [CLI](https://capact.io/docs/cli/getting-started).

## Prerequisites

- [Capact cluster](https://capact.io/docs/next/installation) created.

   > **NOTE**: Currently, only the local version is supported. Use the latest Capact CLI and install Capact from the latest `main` branch.
   > 
   > `capact install --helm-repo=@latest --version=@latest`

- [Node.js 16](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
- [`kubectl`](https://kubernetes.io/docs/tasks/tools/install-kubectl/) installed.

## Usage

Download the NPM dependencies using:

```bash
npm install
```

Create the `.env` file for your environment. For local Capact with default user basic auth, use:

```bash
cat > .env << ENDOFFILE
REACT_APP_CAPACT_GATEWAY_ENDPOINT="https://gateway.capact.local/graphql"
REACT_APP_CAPACT_GATEWAY_ENDPOINT_AUTH_HEADER="Basic Z3JhcGhxbDp0MHBfczNjcjN0"
ENDOFFILE
```

> **NOTE:** If you have an external Capact cluster, modify the environmental variables.

Run the Dashboard locally:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**(Optional)** Make the Argo Workflows UI accessible to be able to use Argo Workflows UI link on Action details view:

```bash
kubectl -n capact-system port-forward svc/argo-argo-workflows-server 2746
```

## Configuration

The following environment variables can be set:

| Name                                          | Required | Default                 | Description                                             |
|-----------------------------------------------|----------|-------------------------|---------------------------------------------------------|
| REACT_APP_CAPACT_GATEWAY_ENDPOINT             | yes      |                         | Capact Gateway endpoint.                                |
| REACT_APP_CAPACT_GATEWAY_ENDPOINT_AUTH_HEADER | yes      |                         | Capact Gateway authorization header.                    |
| REACT_APP_REFETCH_INTERVAL_MS                 | no       | `1000`                  | Re-fetch interval used by React Query to poll new data. |
| REACT_APP_ARGO_WORKFLOWS_UI_BASE_URL          | no       | `http://localhost:2746` | Base URL for Argo Workflows UI used by Capact cluster.  |

## Development

The application has been initialized using [Create React App](https://create-react-app.dev/). In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm run generate-graphql`

Introspects schema of the Capact Gateway GraphQL endpoint and generates TypeScript types and React hooks for the operations defined in `*.graphql` files under `src` directory.

### `npm run setup-hooks`

Configures Git hooks in order to run Prettier for every modified file. It is run automatically as a part of the `npm install`.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
