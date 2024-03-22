@echo off
echo Starting application...

cd Backend
mvn spring-boot:run
cd ../Frontend
npm run-start

timeout /t 5 >nul
start Google http://localhost:4200

echo Application running.