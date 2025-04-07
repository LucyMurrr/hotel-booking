install:
	npm ci

lint:
	npm run lint

lint-fix:
	npm run lint:fix

typecheck:
	npm run typecheck

build:
	npm run build

start:
	npm run start

docker-dependencies-fix:
	docker run --rm -it -v .:/app -w /app node:22-alpine sh -c "npm i"

start-mock-server:
	./node_modules/.bin/prism mock tsp-output/openapi.yaml
	../api/node_modules/.bin/prism mock ../api/tsp-output/openapi.yaml

generate-client:
	npx openapi-typescript-codegen --input ../api/tsp-output/openapi.yaml --output ./app/src/api/

dev: 
	npm run dev
