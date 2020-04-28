#!/bin/bash -xe
cd ..
docker rm -f gmp-store-api || true
docker run \
    --name="gmp-store-api" \
    -d \
    -it \
    -p 3001:3001 \
    -v $(pwd)/.env:/opt/srv/.env:ro \
    gmp-store-api:latest
cd -

docker logs -f gmp-store-api
