#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

# Lancement du backend et du frontend
echo "Starting backend and frontend..."

cd ./Backend
mvn clean install

cd ../Frontend
npm run run-start

sleep 5

# Lancement du site web
open http://localhost:4200/

echo "Webapp started."