
FROM node:latest

WORKDIR /frontend

COPY ./package*.json .

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

COPY . .