#!/bin/bash

# Arrêter le script en cas d'erreur
set -e



echo " ===== Lancement de Docker Desktop... ===== "
# Vérification si Docker est installé
if ! command -v docker &> /dev/null
then
    echo "Docker n'est pas installé. Veuillez l'installer et réessayer."
    exit 1
fi

# Attendre que Docker soit prêt
open -a Docker
echo "En attente de l'ouverture de Docker..."
while ! docker system info > /dev/null 2>&1; do
  sleep 1
done
echo "Docker est prêt."


echo "===== Lancement de l'environnement Docker... ====="
# Lancement de l'environnement Docker
docker-compose -f "docker-compose.yaml" up -d
echo "L'environnement Docker est lancé."


echo " ===== Initialisation de la base de données... ===== "
# Attendre que le conteneur soit prêt pour la connexion
echo "En attente de l'initialisation de MySQL..."
until docker exec 2024_ter_patrimoine-ter_bd-1 mysql -uroot -p'root' -e ";" ; do
  sleep 2
done


echo "===== Lancement du script de démarrage... ====="
# Appeler le script start.sh
./start.sh
