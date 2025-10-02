FROM docker-registry.amirmuz.com/node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with DNS fallback and retry logic
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm install --production --prefer-offline || \
    (echo "Retrying with different DNS..." && \
     echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
     echo "nameserver 8.8.4.4" >> /etc/resolv.conf && \
     npm install --production)

# Copy source files
COPY . .

# Expose backend port
EXPOSE 2306

# Run server
CMD ["node", "server.js"]