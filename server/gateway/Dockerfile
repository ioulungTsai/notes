# Base image from hub.docker.com
FROM node:alpine

# app directory to hold app specific files
WORKDIR /app

# app install dependencies
COPY ./package*.json ./
RUN npm install

# copy compiled file
COPY ./dist ./dist

# Start Command
CMD [ "node", "./dist/index.js" ]
