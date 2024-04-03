@echo off

REM Arrêter le script en cas d'erreur
setlocal enabledelayedexpansion

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
