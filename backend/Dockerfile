FROM gradle:jdk23-corretto-al2023 as builder

WORKDIR /app

COPY backend/build.gradle.kts backend/settings.gradle.kts ./

RUN mkdir -p ./src/generated/java

COPY backend/ ./

COPY api/dist/server/src ./src

RUN gradle clean build --no-daemon -x test -x checkstyleMain -x checkstyleTest

FROM eclipse-temurin:23-jre-alpine
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]