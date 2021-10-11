#!/bin/bash

cd kapischool-back
git pull

sudo pm2 stop ./src/index.js
sudo npm install
sudo pm2 start ./src/index.js