# Use Node.js 22 on Debian slim (stable, better with npm)
FROM node:22-slim

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

# Expose backend port (change if your app uses a different one)
EXPOSE 5000

# Start app
CMD ["npm", "start"]
