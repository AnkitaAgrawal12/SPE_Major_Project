# Use a base image with Node.js pre-installed
FROM node:14-alpine as build

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Start Nginx when the container starts
CMD ["npm","start"]

