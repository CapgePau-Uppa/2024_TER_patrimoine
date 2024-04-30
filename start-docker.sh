#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

echo "Lancement de Docker Desktop..."

# Vérification si Docker est installé
if ! command -v docker &> /dev/null
then
    echo "Docker n'est pas installé. Veuillez l'installer et réessayer."
    exit 1
fi

# Si oui, on l'ouvre
open -a Docker

# Attendre que Docker soit prêt
while ! docker system info > /dev/null 2>&1; do
  echo "En attente de l'ouverture de Docker..."
  sleep 1
done

echo "Docker est prêt."

# Chemin vers le fichier docker-compose.yaml
DOCKER_COMPOSE_PATH="docker-compose.yaml"

# Lancement de l'environnement Docker
docker-compose -f "$DOCKER_COMPOSE_PATH" up -d

echo "L'environnement Docker est lancé."

# Appeler le script start.sh
echo "Lancement du script de démarrage..."
./start.sh
