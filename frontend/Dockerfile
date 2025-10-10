FROM docker-registry.amirmuz.com/nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy pre-built dist
COPY dist/ .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
