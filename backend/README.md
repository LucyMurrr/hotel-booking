Для запуска использовать docker-compose up --build

Линтер запускается командой ./gradlew checkstyleMain

Для выполнения генерации из openAPI:
1. Компиляция в openapi.yaml
   npm install -g @typespec/compiler
   tsp compile main.tsp --emit=@typespec/openapi3
2. Скачиваю https://github.com/OpenAPITools/openapi-generator.git
   wget https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.12.0/openapi-generator-cli-7.12.0.jar -O openapi-generator-cli.jar
3. Запускаю генерацию
   ./gradlew checkClasspath