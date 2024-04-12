#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

# Lancement du backend
echo "======== DEMARRAGE DU BACKEND ========"

cd ./Backend

# Nettoyer le projet et installer les dépendances
if ! mvn clean install; then
  echo "Erreur : Échec de la construction Maven pour le backend."
  exit 1
fi

# Lancement du backend
java -jar target/Backend-0.0.1-SNAPSHOT.jar & backend_pid=$!


# Lancement du frontend
echo "======== DEMARRAGE DU FRONTEND ========"

cd ../Frontend

# Lancement du frontend
if ! npm run run-start; then
  echo "ERREUR : Échec du démarrage du frontend."
  kill $backend_pid
  exit 1
fi

# Délai de sommeil pour s'assurer que le backend est lancé
sleep 5

# Vérification du backend
if ! curl -s http://localhost:8080/actuator/health | grep 'UP' > /dev/null; then
  echo "ERREUR : Le backend ne fonctionne pas correctement."
  kill $backend_pid
  exit 1
fi

# Lancement du site web
echo "======== LANCEMENT DE L'APLICATION ========"

if [[ "$OSTYPE" == "darwin"* ]]; then
  open http://localhost:4200/
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open http://localhost:4200/
fi

echo "======== SITE WEB LANCÉ ========"
