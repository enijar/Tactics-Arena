#!/usr/bin/env bash

# Download all models for the game into their respective directories

# Furgon model
mkdir -p public/models/furgon
curl -o public/models/furgon/model.dae https://s3.eu-west-2.amazonaws.com/arenareborn/models/furgon/model.dae
curl -o public/models/furgon/skin.dae https://s3.eu-west-2.amazonaws.com/arenareborn/models/furgon/skin.dae
