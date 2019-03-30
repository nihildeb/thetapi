#!/bin/sh
set -eu

THETAPI_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[ -d "${THETAPI_HOME}" ] || { echo >&2 "${THETAPI_HOME} does not exist"; exit 1; }
[ -x "$(command -v node)" ] || { echo >&2 "NodeJS not found"; exit 1; }

(cd "${THETAPI_HOME}/src" && node ./index.js "$@")

