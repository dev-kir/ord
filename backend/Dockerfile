FROM docker-registry.amirmuz.com/node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (if needed for native modules)
RUN apk add --no-cache python3 make g++

# Copy dependency files first
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of backend code
COPY . .

# Expose backend port
EXPOSE 2306

# Start backend server
CMD ["node", "server.js"]