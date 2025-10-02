# Use Node.js 22 Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy rest of the backend source
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "server.js"]