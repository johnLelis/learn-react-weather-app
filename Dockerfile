# Stage 1: Build Vite app
FROM node:22-alpine AS builder

WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default config and replace with custom
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
