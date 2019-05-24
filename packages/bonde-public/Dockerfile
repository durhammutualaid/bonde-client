FROM node:10-alpine
MAINTAINER Nossas <tech@nossas.org>

WORKDIR /code
COPY . .
RUN yarn --pure-lock && yarn cache clean
