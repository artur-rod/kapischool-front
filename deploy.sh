#!/bin/bash

cd kapischool-front
git pull

sudo pm2 stop kapischool
sudo npm install
sudo pm2 serve build/ 3000 --name "kapischool" --spa