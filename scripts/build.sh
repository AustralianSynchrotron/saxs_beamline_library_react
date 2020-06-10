#!/bin/sh
rm -r docker/production/build
# yarn upgrade
yarn build
mv build docker/production/
hash=$(git  rev-parse --short=6 HEAD)
docker build -f docker/production/Dockerfile -t docker.asci.synchrotron.org.au/saxs/beamline_library_react:$hash docker/production
docker push docker.asci.synchrotron.org.au/saxs/beamline_library_react:$hash