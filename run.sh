#!/bin/bash
# Generate Certificate
openssl req -x509 -newkey rsa:2048 -keyout dev.local.key -out dev.local.crt -days 365 -nodes -subj /CN=dev.local -config ssl-cert.cnf

# Add cert to be trusted in host
MY_OS=$(uname)
echo "Adding cert to keychain so running next step as sudo"

MACHINE_CERT=/usr/local/share/ca-certificates
MY_CERT_NAME=dev.local.crt

DEV_MACHINE_CERT_FOLDER=$MACHINE_CERT/localDev
DEV_MACHINE_CERT_FOLDER_AND_FILE_NAME=$DEV_MACHINE_CERT_FOLDER/$MY_CERT_NAME
MY_CERT_FULL_PATH_AND_NAME=`pwd`/$MY_CERT_NAME

sudo mkdir -p $DEV_MACHINE_CERT_FOLDER
sudo chmod 755 $DEV_MACHINE_CERT_FOLDER
sudo touch $DEV_MACHINE_CERT_FOLDER_AND_FILE_NAME
sudo chmod 777 $DEV_MACHINE_CERT_FOLDER_AND_FILE_NAME
sudo cat $MY_CERT_FULL_PATH_AND_NAME > $DEV_MACHINE_CERT_FOLDER_AND_FILE_NAME
sudo chmod 644 $DEV_MACHINE_CERT_FOLDER_AND_FILE_NAME
sudo update-ca-certificates
