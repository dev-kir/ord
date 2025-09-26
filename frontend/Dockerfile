FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Try to install without native compilation
RUN npm install --legacy-peer-deps --no-optional

# Copy source code
COPY . .

# Build static assets
RUN npm run build

# Install serve
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]