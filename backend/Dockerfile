FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with better error handling
RUN npm cache clean --force && \
    npm ci --omit=dev --prefer-offline --no-audit || \
    npm install --omit=dev --prefer-offline --no-audit

# Copy all project files
COPY . .

CMD ["node", "server.js"]