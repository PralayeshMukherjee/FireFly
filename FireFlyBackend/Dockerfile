#FROM ubuntu:latest
#LABEL authors="rajmu"
#
#ENTRYPOINT ["top", "-b"]

# Use Java 21 base image
FROM openjdk:21-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy your project files (this must come before RUN)
COPY . .

# Make mvnw executable (important for Linux environments)
RUN chmod +x mvnw

# Build the project and skip tests
RUN ./mvnw clean package -DskipTests

# Copy built JAR to final location (optional but clean)
RUN cp target/*.jar app.jar

# Expose port (optional, Render doesn’t require it)
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
