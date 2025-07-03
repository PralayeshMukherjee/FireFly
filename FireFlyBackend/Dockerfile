#FROM ubuntu:latest
#LABEL authors="rajmu"
#
#ENTRYPOINT ["top", "-b"]

# ------------ Build Stage ------------
FROM maven:3.9.3-eclipse-temurin-21 AS builder

# Set working directory
WORKDIR /app

# Copy all project files into the container
COPY . .

# Build the Spring Boot app (skip tests to avoid DB errors)
RUN mvn clean package -DskipTests

# ------------ Runtime Stage ------------
FROM eclipse-temurin:21-jdk-jammy

# Working directory inside the container
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

