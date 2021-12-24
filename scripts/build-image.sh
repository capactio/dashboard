#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

DOCKER_REPOSITORY=${DOCKER_REPOSITORY:-"ghcr.io/capactio"}
DOCKER_TAG=${DOCKER_TAG:-"latest"}

CURRENT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
REPO_ROOT_DIR=$(cd "${CURRENT_DIR}/.." && pwd)
APP_NAME="dashboard"

pushd "${REPO_ROOT_DIR}"

docker build -t "${DOCKER_REPOSITORY}/${APP_NAME}:${DOCKER_TAG}" .

popd
