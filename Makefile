drop-database:
	docker-compose down -v

build:
	docker compose -f docker-compose.yml up --build

dev:
	docker compose up --build
