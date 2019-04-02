#!/usr/bin/env sh

ssh charles@51.77.202.235 <<EOF
 cd /var/www/footballquizz
 git pull
 npm install -- production
 npm run build
 cd client
 npm install -- production
 npm run build
 pm2 restart all
 exit
EOF