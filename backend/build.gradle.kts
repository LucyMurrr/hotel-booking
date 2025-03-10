plugins {
	java
	id("org.springframework.boot") version "3.4.3"
	id("io.spring.dependency-management") version "1.1.7"
	id("checkstyle")
}

group = "aim"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(23)
	}
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

tasks.register<JavaExec>("generateServerCode") {
	group = "openapi"
	description = "Generate server code from OpenAPI specification"

	// Укажите путь к JAR-файлу OpenAPI Generator
	classpath = files("../api/openapi-generator-cli-7.12.0.jar")

	// Основной класс для запуска
	mainClass.set("org.openapitools.codegen.OpenAPIGenerator")

	// Аргументы для OpenAPI Generator
	args(
		"generate",
		"-i", "../api/tsp-output/schema/openapi.yaml", // Путь к вашему openapi.yaml
		"-g", "spring",              // Генерация кода для Spring Boot
		"-o", "../api/generated-code", // Выходная директория
		"--additional-properties", "useSpringBoot3=true,dateLibrary=java8,library=spring-boot"
	)
}

dependencies {
	implementation ("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation ("org.springframework.boot:spring-boot-starter-web")
	implementation ("org.postgresql:postgresql")
	compileOnly("org.projectlombok:lombok")
	developmentOnly("org.springframework.boot:spring-boot-docker-compose")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
