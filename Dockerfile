FROM node:20-alpine

MAINTAINER Some dev

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json .

RUN npm i