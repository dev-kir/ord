# Use Node.js LTS (22) on Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install only production deps
RUN npm ci --omit=dev

# Copy rest of backend code
COPY . .

# Expose API port
EXPOSE 2306

# Run backend
CMD ["node", "server.js"]
