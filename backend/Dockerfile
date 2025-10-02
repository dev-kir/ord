# ======== Backend Dockerfile ========

# Use stable Node 20 LTS, slim Debian image
FROM node:20-bullseye-slim

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 2306

# Start the server
CMD ["npm", "start"]
