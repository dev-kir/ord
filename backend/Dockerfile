# backend/Dockerfile
FROM docker-registry.amirmuz.com/node:20-alpine

# set working directory
WORKDIR /app

# copy package files first (better cache)
COPY package*.json ./

# install dependencies
RUN npm install --production

# copy source
COPY . .

# expose backend port
EXPOSE 2306

# run server
CMD ["node", "server.js"]
