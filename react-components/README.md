# React components

This directory contains source code for the Capact React components.

React components is a library that contains reusable components for React.js, which helps building custom UI for Capact installations.

## Prerequisites

- [Node.js 17](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed.
- Installed dependencies according to the [Install dependencies](../README.md#install-dependencies) section from the main Readme.

## Development

### Run components explorer development server

To run the React components explorer UI in watch mode, run:

```bash
npm run storybook
```

### Build components explorer

To built the components explorer UI static page, run:

```bash
npm run storybook:build
```

### Other commands

### `npm start`

Watches for changes to the library and builds its in real time.

### `npm test:watch`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test`

Runs tests in the directory.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
