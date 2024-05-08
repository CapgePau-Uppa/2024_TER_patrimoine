@echo off
SETLOCAL

echo ===== Lancement de Docker Desktop... =====

REM Vérification si Docker est installé
docker --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo Docker n'est pas installé. Veuillez l'installer et réessayer.
    exit /b 1
)

REM On lance Docker Desktop
start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

REM On attend que Docker soit prêt
:waitForDocker
docker system info >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo En attente de l'ouverture de Docker...
    TIMEOUT /T 1 >nul
    GOTO waitForDocker
)
echo Docker est prêt.

echo ===== Lancement de l'environnement Docker... =====
SET DOCKER_COMPOSE_PATH=docker-compose.yaml
docker-compose -f "%DOCKER_COMPOSE_PATH%" up -d

IF %ERRORLEVEL% NEQ 0 (
    echo Une erreur est survenue lors du lancement de l'environnement Docker.
    exit /b 1
)
echo L'environnement Docker est lancé.

echo ===== Initialisation de la base de données... =====
:waitForMySQL
docker exec 2024_ter_patrimoine-ter_bd-1 mysql -uroot -p'root' -e ";" >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo En attente de l'initialisation de MySQL...
    TIMEOUT /T 2 >nul
    GOTO waitForMySQL
)

REM Vérification de la connexion à la base de données
echo Vérification de la base de données...
docker exec 2024_ter_patrimoine-ter_bd-1 mysql -uroot -p'root' -e "USE ter_bd; SHOW TABLES"

echo ===== Lancement du script de démarrage... =====
call start.bat
