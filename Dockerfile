# Use an official Node.js runtime as a parent image
FROM node:16-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application's files to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 4200
EXPOSE 4200

# Start the application
CMD ["npm", "start"]
