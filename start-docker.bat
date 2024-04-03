@echo off
REM Arrêter le script en cas d'erreur
setlocal enabledelayedexpansion

echo "Starting Docker Desktop..."
start Docker
timeout /t 10

REM Chemin vers le fichier docker-compose.yaml
set DOCKER_COMPOSE_PATH=docker-compose.yaml

REM Vérification si Docker est installé
docker --version >nul 2>&1
if errorlevel 1 (
    echo "Docker n'est pas installé. Veuillez l'installer et réessayer."
    exit /b 1
)

REM Lancement de l'environnement Docker
docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d

echo "Docker environment started."

REM Appeler le script start.sh
echo "Starting other launch script..."
call start.bat
