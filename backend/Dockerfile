# Используем образ с Gradle и JDK 23
FROM gradle:jdk23-corretto-al2023

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование файлов build.gradle.kts и settings.gradle.kts
COPY build.gradle.kts settings.gradle.kts ./

# Копирование исходного кода
COPY src ./src

# Сборка проекта
RUN gradle clean build --no-daemon

# Копирование собранного JAR-файла в рабочую директорию
RUN cp build/libs/hotel-booking-0.0.1-SNAPSHOT.jar app.jar

# Команда для запуска приложения
ENTRYPOINT ["java", "-jar", "app.jar"]