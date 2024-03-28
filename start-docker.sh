#!/bin/bash
echo "Starting Docker environment..."

# Chemin vers le fichier docker-compose.yaml
DOCKER_COMPOSE_PATH="docker-compose.yaml"

# Lancement de l'environnement Docker
docker-compose -f "$DOCKER_COMPOSE_PATH" up -d

echo "Docker environment started."


echo "Starting backend..."

cd Backend
mvn spring-boot:run &
cd ..

echo "Starting Frontend..."

cd Frontend
npm run run-start
cd ..

sleep 5

open -a Google http://localhost:4200/

echo "Application started."
