# Use Node.js 22 Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Switch to a more reliable mirror and install build dependencies
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.alpinelinux.org/g' /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    python3 \
    py3-pip \
    make \
    g++ \
    bash

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy rest of the backend source
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["node", "index.js"]