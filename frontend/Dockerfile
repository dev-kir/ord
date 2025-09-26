# Stage 1: Build frontend
FROM node:22-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install system deps + Node deps
RUN apk add --no-cache python3 make g++ \
    && npm ci --omit=dev

# Copy source code
COPY . .

# Build static files
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built frontend into nginx
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
