#!/bin/bash
set -e

[ -z "${RELEASE_VERSION}" ] && echo "Need to set RELEASE_VERSION" && exit 1;

SOURCE_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
RELEASE_VERSION_MAJOR_MINOR="$(echo "${RELEASE_VERSION}" | sed -E 's/([0-9]+\.[0-9])\.[0-9]/\1/g')"
RELEASE_BRANCH="release-${RELEASE_VERSION_MAJOR_MINOR}"

main() {
  git tag "v${RELEASE_VERSION}"
  git push origin "v${RELEASE_VERSION}"

  if [ "${RELEASE_BRANCH}" != "${SOURCE_BRANCH}" ]; then
    git checkout -B "${RELEASE_BRANCH}"
    git push origin "${RELEASE_BRANCH}"
  fi
}

main
