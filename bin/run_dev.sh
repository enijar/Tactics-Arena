#!/usr/bin/env bash

memcached &
npm run server:watch &
npm run assets:watch
