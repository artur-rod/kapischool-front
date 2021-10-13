#!/bin/bash

cd kapischool-back
git pull

sudo pm2 stop react-scripts start
sudo npm install
sudo pm2 start react-scripts start