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

### Build applications

To build all applications, run:

```bash
npm run build
```
