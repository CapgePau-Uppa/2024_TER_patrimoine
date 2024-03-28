@echo off

echo Starting Docker Desktop...
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
timeout /t 10

:: Chemin vers le fichier docker-compose.yaml
set DOCKER_COMPOSE_PATH=docker-compose.yaml

:: Vérification si Docker est installé
docker -v >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Docker n'est pas installé. Veuillez l'installer et réessayer.
    exit /b 1
)

:: Lancement de l'environnement Docker
docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d

echo Docker environment started.

:: Lancement du backend et du frontend
echo Starting backend and frontend...

cd Backend
start mvn clean install
start mvn spring-boot:run
cd ..

cd Frontend
start npm run run-start
cd ..

timeout /t 5

:: Lancement du site web
start http://localhost:4200/

echo Webapp started.
