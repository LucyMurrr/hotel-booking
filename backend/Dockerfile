FROM gradle:jdk23-corretto-al2023

WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./

COPY src ./src

RUN gradle clean build --no-daemon -x checkstyleMain -x checkstyleTest

RUN cp build/libs/hotel-booking-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]