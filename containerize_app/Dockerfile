# Use official Node.js image
FROM node:24

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY index.js .

# Expose port (change if needed)
EXPOSE 3000

# Command to run your app (change as needed)
CMD ["node", "index.js"]