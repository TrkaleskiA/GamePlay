# Base image
FROM node:20

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (5000)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
