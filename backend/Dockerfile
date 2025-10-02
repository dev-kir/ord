FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

WORKDIR /app

# Copy everything including node_modules
COPY . .

# Expose backend port
EXPOSE 2306

CMD ["node", "server.js"]
