# Stage 1: Build frontend
FROM node:22-alpine AS build

WORKDIR /app

# Fix DNS for apk, then install build deps
RUN echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/main" > /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories \
    && apk update \
    && apk add --no-cache python3 make g++ bash

# Copy package files
COPY package*.json ./

# Install deps (omit dev, fix peer deps issues)
RUN npm ci --omit=dev --legacy-peer-deps

# Copy source code
COPY . .

# Build static assets
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
