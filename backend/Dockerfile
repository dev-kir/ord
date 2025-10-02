FROM docker-registry.amirmuz.com/node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies (if needed for native modules)
RUN apt-get update && apt-get install -y \
    python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

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