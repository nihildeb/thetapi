#!/bin/sh
set -eu

THETAPI_HOME="$(cd $(dirname $0)/.. && pwd )"
[ -d "${THETAPI_HOME}" ] || \
  { echo >&2 "${THETAPI_HOME} does not exist"; exit 1; }
export THETAPI_HOME=$THETAPI_HOME

[ -x "$(command -v node)" ] || \
  { echo >&2 "NodeJS not found"; exit 1; }

[ -d "${THETAPI_HOME}/node_modules" ] || \
  (cd "${THETAPI_HOME}" && npm i)

(cd "${THETAPI_HOME}" && node ./src/index.js "$@")

