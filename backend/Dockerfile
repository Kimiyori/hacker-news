FROM node:latest

WORKDIR /backend

COPY ./package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . .