# Single stage build - serve directly with Node.js
FROM node:22-alpine

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++ bash

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev for build)
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build static assets
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "3000"]