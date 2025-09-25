# Use Node.js LTS (22) on Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies (omit dev)
RUN apk add --no-cache python3 py3-pip build-base \
    && npm ci --omit=dev

# Copy rest of the backend code
COPY . .

# Expose backend port
EXPOSE 2306

# Start backend server
CMD ["node", "server.js"]
