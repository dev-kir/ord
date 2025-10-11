FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

WORKDIR /app
COPY . .
CMD ["node", "models/seed/log.seed.js"]
