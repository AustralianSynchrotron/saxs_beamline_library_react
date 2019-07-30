#!/bin/sh
rm -r docker/production/build
# yarn upgrade
REACT_APP_WEBSOCKET=3142 yarn build
mv build docker/production/
docker build -f docker/production/Dockerfile -t docker.synchrotron.org.au/saxs/beamline_library_react:858430 docker/production
docker push docker.synchrotron.org.au/saxs/beamline_library_react:858430