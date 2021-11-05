#!/bin/bash

cd kapischool-front
rm -r package-lock.json
git pull

sudo pm2 stop APP-Kapi
sudo npm install
sudo npm run build
sudo pm2 serve build/ 8080 --name "APP-Kapi" --spa
