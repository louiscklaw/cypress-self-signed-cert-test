#!/bin/bash
openssl req -x509 -newkey rsa:4096 -keyout dev.local.key -out dev.local.crt -days 2 -nodes -subj /CN=dev.local -config ssl-cert.cnf
