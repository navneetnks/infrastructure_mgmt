# Step 1. build the production bundle
FROM node:22-alpine AS build

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Step 2. serve the app with nginx server
FROM nginx:1.17.0
COPY --from=build /app/build /usr/share/nginx/html
