# Use your internal Node image
FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

WORKDIR /app

# Copy only dependency manifests first
COPY package*.json ./

# Install dependencies (safe fallback if lock file missing)
RUN npm install || npm install --omit=dev

# Copy only the files we actually need
COPY models ./models

# Default MongoDB URI for Docker Swarm
ENV MONGO_URI="mongodb://mongo1:27017,mongo2:27017,mongo3:27017/ord?replicaSet=rs0"

# Run the seeder script
CMD ["node", "models/seed/log.seed.js"]
