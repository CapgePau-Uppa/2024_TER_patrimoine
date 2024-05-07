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

while ! docker system info > /dev/null 2>&1; do
  echo "En attente de l'ouverture de Docker..."
  sleep 1
done
echo "Docker est prêt."



echo "===== Lancement de l'environnement Docker... ====="
# Lancement de l'environnement Docker
docker-compose -f "docker-compose.yaml" up -d
echo "L'environnement Docker est lancé."



echo " ===== Initialisation de la base de données... ===== "
# Attendre que le conteneur soit prêt pour la connexion
until docker exec 2024_ter_patrimoine-ter_bd-1 mysql -uroot -p'root' -e ";" ; do
  echo "En attente de l'initialisation de MySQL..."
  sleep 2
done

# Vérification de la connexion à la base de données
echo "Vérification de la base de données..."
docker exec 2024_ter_patrimoine-ter_bd-1 mysql -uroot -p'root' -e "USE ter_bd; SHOW TABLES"



echo "===== Lancement du script de démarrage... ====="
# Appeler le script start.sh
./start.sh
