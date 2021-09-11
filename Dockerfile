# BUILD STAGE
FROM node:16.6.0 AS build

WORKDIR /usr/src/app
COPY . .

RUN npm ci --ignore-scripts
RUN npm run build

# PROD STAGE
FROM node:16.6.0-alpine3.14 AS prod

ENV NODE_ENV production

RUN apk update && apk add dumb-init

WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app
COPY --chown=node:node package.json /usr/src/app
COPY --chown=node:node package-lock.json /usr/src/app
RUN npm ci --only=production --ignore-scripts

USER node
CMD ["dumb-init", "node", "server.js"]