#!/bin/bash
echo "Starting application..."

cd Backend
mvn spring-boot:run &
cd ../Frontend
npm run run-start

sleep 5
open -a Google http://localhost:4200/

echo "Application stopped."
