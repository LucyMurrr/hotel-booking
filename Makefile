OPENAPI_GENERATOR_IMAGE := openapitools/openapi-generator-cli:latest-release
SCHEMATHESIS_IMAGE := schemathesis/schemathesis:latest

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
		-g typescript-fetch \
		-o /local/dist/client \
		--additional-properties=npmName="@api/client",supportsES6=true

test-api:
	docker run --rm -v ${PWD}/api:/api $(SCHEMATHESIS_IMAGE) run \
		--base-url=http://backend:8080 \
		/api/tsp-output/openapi.yaml \
		--checks=all \
		--validate-schema=true \
		--hypothesis-max-examples=100

gen-all: gen-api gen-server gen-client

dev:
	docker-compose up --build

build: gen-all
	docker-compose -f docker-compose.yml up --build

drop-database:
	docker-compose down -v
