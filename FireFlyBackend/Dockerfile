#FROM ubuntu:latest
#LABEL authors="rajmu"
#
#ENTRYPOINT ["top", "-b"]

# Use Maven to build the project
FROM maven:3.9.3-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Base image with Java 17 (use Java 21 if your app requires it)
FROM eclipse-temurin:21-jdk-jammy

# Set working directory in container
WORKDIR /app

# Copy the entire backend folder into the container
COPY . .

# Build the Spring Boot application and skip tests to avoid DB errors
RUN ./mvnw clean package -DskipTests

# Copy only the built JAR file
COPY target/*.jar app.jar

# Set the command to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]

