install:
	npm ci

types-to-openapi:
	npx tsp compile .

generated back:
   npm install -g @typespec/compiler
   tsp compile main.tsp --emit=@typespec/openapi3
   wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.12.0/openapi-generator-cli-7.12.0.jar -O openapi-generator-cli.jar