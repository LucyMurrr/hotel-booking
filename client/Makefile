docker-dependencies-fix:
	docker run --rm -it -v .:/app -w /app node:22-alpine sh -c "npm i"

start-mock:
	../api/node_modules/.bin/prism mock ../api/tsp-output/openapi.yaml
