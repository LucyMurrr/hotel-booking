FROM gradle:jdk23-corretto-al2023 as builder

WORKDIR /app

COPY backend/build.gradle.kts backend/settings.gradle.kts ./

RUN mkdir -p ./src/generated/java

COPY backend/src ./src

COPY api/dist/server/src /tmp/openapi

RUN cp -r /tmp/openapi/main/java/org ./src/generated/java/

RUN gradle clean build --no-daemon -x test -x checkstyleMain -x checkstyleTest

FROM eclipse-temurin:23-jre-alpine
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]