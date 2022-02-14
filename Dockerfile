# syntax=docker/dockerfile:1

FROM node:14-alpine

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY ["package.json", "package-lock.json",  "./"]

RUN npm install 

COPY . .

CMD npm start