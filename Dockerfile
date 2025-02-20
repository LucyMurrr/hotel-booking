# поправить версию node
FROM node:16 AS frontend-builder
WORKDIR /app/client
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# поправить версию jdk
FROM maven:3.8.5-openjdk-17 AS backend-builder
WORKDIR /app/backend
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/ .
RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim
WORKDIR /app

COPY --from=frontend-builder /app/frontend/dist backend/src/main/resources/static

COPY --from=backend-builder /app/backend/target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]