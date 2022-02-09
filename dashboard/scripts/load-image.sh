#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

DOCKER_IMAGES_DIR=${DOCKER_IMAGES_DIR:-/tmp/dashboard-images}
APP_NAME="dashboard"

docker load --input "${DOCKER_IMAGES_DIR}/${APP_NAME}.tar"
