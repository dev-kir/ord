# Use Node 20 Alpine from your private registry
FROM docker-registry.amirmuz.com/node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (to leverage caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of your project files
COPY . .

# Expose backend port
EXPOSE 2306

# Start server
CMD ["npm", "start"]
