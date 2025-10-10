# Use your internal Node build image
FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

# Set working directory
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies (inside the container, Alpine-compatible)
RUN npm install --omit=dev

# Copy the rest of your source code
COPY . .

# Expose backend port
EXPOSE 2306

# Start server
CMD ["node", "server.js"]
