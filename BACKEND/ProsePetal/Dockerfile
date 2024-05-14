# Use a base image with Java pre-installed
FROM adoptopenjdk/openjdk11:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled JAR file into the container
COPY target/your-backend-app.jar /app/your-backend-app.jar

# Expose the port on which your Spring Boot application will run
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "your-backend-app.jar"]

