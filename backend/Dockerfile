# Use official Node.js LTS image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy all project files
COPY . .

# Expose backend port
EXPOSE 2306

# Start server
CMD ["npm", "start"]
