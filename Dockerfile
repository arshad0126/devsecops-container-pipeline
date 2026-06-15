# ==========================================
# Stage 1: Build Environment
# ==========================================
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --frozen-lockfile

# Copy app source and build
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Secure Production Environment
# ==========================================
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

# Copy compiled static assets from build stage
COPY --from=build /app/build ./

# Copy custom secure Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Support running container as non-root user (Security Best Practice)
# Change directory ownership to default unprivileged nginx user (UID 101)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx

# Non-root user declaration
USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
