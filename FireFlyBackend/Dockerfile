# First stage: Build the JAR
FROM maven:3.9.6-eclipse-temurin-21 as builder

WORKDIR /app

# Copy all files and build
COPY . .
RUN mvn clean package -DskipTests

# Second stage: Run the app with smaller JDK image
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the default port
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
