@echo off
SETLOCAL

echo Lancement de Docker Desktop...

REM Vérification si Docker est installé
docker --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker n'est pas installé. Veuillez l'installer et reessayer.
    exit /b 1
)

REM On lance Docker Desktop (Remplacez "C:\Program Files\Docker\Docker\Docker Desktop.exe" par le chemin d'installation de votre Docker Desktop si différent)
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM On attend que Docker soit prêt
:waitForDocker
docker info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo En attente de l'ouverture de Docker...
    TIMEOUT /T 1 >nul
    GOTO waitForDocker
)

echo Docker est prêt.

REM Chemin vers le fichier docker-compose.yaml
SET DOCKER_COMPOSE_PATH=docker-compose.yaml

REM Lancement de l'environnement Docker
docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d

IF %ERRORLEVEL% NEQ 0 (
    echo Une erreur est survenue lors du lancement de l'environnement Docker.
    exit /b 1
)

echo L'environnement Docker est lancé.

REM Appel au script start.bat au lieu de start.sh
echo Lancement du script de demarrage...
call start.bat
