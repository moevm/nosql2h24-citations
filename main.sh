cp .env.example .env
cp server/.env.example server/.env
cp frontend/.env.example frontend/.env
docker-compose exec db mongo quotes init.js
