# Use Node.js 22 Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install build dependencies for npm (native modules, etc.)
RUN apk add --no-cache python3 make g++ bash

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy rest of the backend source
COPY . .

