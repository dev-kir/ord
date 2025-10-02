FROM docker-registry.amirmuz.com/node:20-alpine-buildtools

WORKDIR /app

COPY package*.json ./
# Install all dependencies, including devDependencies
RUN npm install --legacy-peer-deps

COPY . .
# Build frontend
RUN npm run build

# Stage 2: Production
FROM docker-registry.amirmuz.com/nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]