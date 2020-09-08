#!/bin/bash
# Import to osx key-chain
sudo --reset-timestamp security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ./dev.local.crt
