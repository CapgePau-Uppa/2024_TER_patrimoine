@echo off
SETLOCAL EnableDelayedExpansion

REM Arrêter le script en cas d'erreur
SET ERRORLEVEL=0

REM Lancement du backend
echo ======== DEMARRAGE DU BACKEND ========
cd Backend

REM Nettoyer le projet et installer les dépendances
call mvn clean install
IF %ERRORLEVEL% NEQ 0 (
  echo Erreur : Echec de la construction Maven pour le backend.
  exit /b 1
)

REM Lancement du backend
start /b java -jar target/Backend-0.0.1-SNAPSHOT.jar
FOR /F "tokens=2" %%i IN ('tasklist /FI "IMAGENAME eq java.exe" /FO TABLE /NH') DO SET backend_pid=%%i

REM Délai de sommeil pour s'assurer que le backend est lancé
TIMEOUT /T 5

REM Lancement du frontend
echo ======== DEMARRAGE DU FRONTEND ========
cd ../Frontend

REM Lancement du frontend
call npm run run-start
IF %ERRORLEVEL% NEQ 0 (
  echo ERREUR : Echec du demarrage du frontend.
  taskkill /pid !backend_pid! /f
  exit /b 1
)

REM Vérification du backend
curl -s http://localhost:8080/actuator/health | findstr "UP"
IF %ERRORLEVEL% NEQ 0 (
  echo ERREUR : Le backend ne fonctionne pas correctement.
  taskkill /pid !backend_pid! /f
  exit /b 1
)

REM Lancement du site web
echo ======== LANCEMENT DE L'APPLICATION ========
start http://localhost:4200/

echo ======== SITE WEB LANCE ========
