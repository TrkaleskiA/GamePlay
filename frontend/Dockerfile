# Build stage
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build files to nginx html
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx config (optional, default is ok)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
