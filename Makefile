OPENAPI_GENERATOR_IMAGE=openapitools/openapi-generator-cli:latest-release

gen-api:
	docker run --rm -v ${PWD}/api:/api node:22-alpine sh -c "cd /api && npm i && npx tsp compile ."

gen-server:
	docker run --rm -v ${PWD}/api:/local $(OPENAPI_GENERATOR_IMAGE) generate \
		-i /local/tsp-output/openapi.yaml \
		-g spring \
		-o /local/dist/server \
		--additional-properties=useSpringBoot3=true,dateLibrary=java8,library=spring-boot

gen-client:
	docker run --rm -v ${PWD}/api:/local $(OPENAPI_GENERATOR_IMAGE) generate \
		-i /local/tsp-output/openapi.yaml \
		-g typescript-axios \
		-o /local/dist/client \
		--additional-properties=npmName="@api/client",supportsES6=true

gen-tests:
	docker run --rm -v ${PWD}/api:/local $(OPENAPI_GENERATOR_IMAGE) generate \
		-i /local/tsp-output/openapi.yaml \
		-g java \
		-o /local/dist/tests \
		--additional-properties=library=rest-assured,useJakartaEe=true

test-api:
	docker run --rm -v ${PWD}/api/dist/server:/app -w /app $(TEST_IMAGE) \
		gradle test -Dspring.profiles.active=test

gen-all: gen-api gen-server gen-client gen-tests

dev:
	docker compose up --build

build: gen-all
	docker compose -f docker-compose.yml up --build

drop-database:
	docker-compose down -v
