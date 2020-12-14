#!/bin/bash
MY_OS=$(uname)
MY_CERT_NAME=dev.local.crt

if [ ! -z "$CI" ]; then
  ## For Github Actions
  echo "Adding dev.local for Github Actions"
  MACHINE_CERT=/usr/local/share/ca-certificates

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
elif [ "$MY_OS" == "Darwin" ]; then
  ## For local testing
  echo "Adding dev.local for Mac"

  # Add cert to be trusted in host
  echo "Adding cert to keychain so running next steps as sudo"
  sudo --reset-timestamp security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $MY_CERT_NAME
fi
