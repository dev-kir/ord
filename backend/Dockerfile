FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 2306

CMD ["node", "server.js"]
