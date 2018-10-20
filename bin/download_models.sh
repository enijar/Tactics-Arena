#!/usr/bin/env bash

# Download all models for the game into their respective directories

# Furgon model
mkdir -p public/models/furgon
curl -o public/models/furgon/model.fbx https://s3.eu-west-2.amazonaws.com/arenareborn/models/furgon/model.fbx
curl -o public/models/furgon/Furgon_Model_final.png https://s3.eu-west-2.amazonaws.com/arenareborn/models/furgon/Furgon_Model_final.png
