drop-database:
	docker-compose down -v

build:
	docker compose -f docker-compose.yml up --build

dev:
	docker compose -f docker-compose.yml -f docker-compose.override.yml up --build
