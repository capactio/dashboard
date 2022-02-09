#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

DOCKER_REPOSITORY=${DOCKER_REPOSITORY:-"ghcr.io/capactio"}
DOCKER_TAG=${DOCKER_TAG:-"latest"}
DOCKER_IMAGES_DIR=${DOCKER_IMAGES_DIR:-/tmp/dashboard-images}
APP_NAME="dashboard"

mkdir -p "${DOCKER_IMAGES_DIR}"
docker save "${DOCKER_REPOSITORY}/${APP_NAME}:${DOCKER_TAG}" > "${DOCKER_IMAGES_DIR}/${APP_NAME}.tar"
