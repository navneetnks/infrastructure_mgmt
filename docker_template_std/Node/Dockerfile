FROM node:22-alpine AS development

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json .

RUN npm i --include=dev
# RUN npm install -g nodemon

COPY . .

CMD [ "npm", "run", "dev" ]

FROM node:22-slim AS prod_dependencies

WORKDIR /app

COPY package*.json .

RUN npm i --only=production

FROM gcr.io/distroless/nodejs22 AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod_dependencies /app/node_modules node_modules
COPY src src
CMD [ "src/server.js" ]