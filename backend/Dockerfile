# Базовый образ с Java 23
FROM openjdk:23-jdk-slim

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование JAR-файла приложения в контейнер
COPY build/libs/hotel-booking-0.0.1-SNAPSHOT.jar /app/app.jar

# Команда для запуска приложения
ENTRYPOINT ["java", "-jar", "app.jar"]