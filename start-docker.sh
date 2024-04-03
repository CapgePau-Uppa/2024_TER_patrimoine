#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

echo "Starting Docker Desktop..."
open -a Docker
sleep 10

# Chemin vers le fichier docker-compose.yaml
DOCKER_COMPOSE_PATH="docker-compose.yaml"

# Vérification si Docker est installé
if ! command -v docker &> /dev/null
then
    echo "Docker n'est pas installé. Veuillez l'installer et réessayer."
    exit 1
fi

# Lancement de l'environnement Docker
docker-compose -f "$DOCKER_COMPOSE_PATH" up -d

echo "Docker environment started."

# Appeler le script start.sh
echo "Starting other launch script..."
./start.sh