#!/bin/bash -xe
cd ..
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t gmp-store-api:latest .
cd -
