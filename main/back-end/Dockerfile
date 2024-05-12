# Use a base image with Java and Maven installed for building
FROM maven:3.8.1-openjdk-17-slim AS build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven configuration file
COPY ./main/back-end/pom.xml ./

# Download the Maven dependencies
RUN mvn dependency:go-offline

# Copy the rest of the application code
COPY ./main/back-end/src ./src

# Build the application
RUN mvn package -DskipTests

# Create a separate stage for the runtime image
FROM openjdk:17-jdk-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file from the previous stage
COPY --from=build /app/target/ToDoLabSoftware.jar ./

# Expose the port that your Spring Boot application uses (usually 8080)
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "ToDoLabSoftware.jar"]
