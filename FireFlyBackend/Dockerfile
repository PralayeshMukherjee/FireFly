#FROM ubuntu:latest
#LABEL authors="rajmu"
#
#ENTRYPOINT ["top", "-b"]

FROM openjdk:21-jdk-slim
WORKDIR /app
# Build the Spring Boot application and skip tests to avoid DB errors
RUN ./mvnw clean package -DskipTests
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
