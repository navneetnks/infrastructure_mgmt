# Use official Node.js image
FROM node:24

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose port (change if needed)
EXPOSE 5000

# added environment variable
ENV PORT=5000
ENV APP_NAME="Envrionment Variable Demo App"

# Command to run your app (change as needed)
CMD ["node", "src/index.js"]

# command to run the docker build
# docker build -t express_app_env_vars_image:4.0 .
# command to run the docker container with environment variables from .env file
# docker run -d --env-file ".env.prod" -p 9000:9000 --name env_web_9000 express_app_env_vars_image:4.0
# docker run -d --env-file ".env.dev" -p 4000:4000 --name env_web_4000 express_app_env_vars_image:4.0