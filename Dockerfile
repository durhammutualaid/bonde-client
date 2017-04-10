FROM kkarczmarczyk/node-yarn
MAINTAINER Nossas <tech@nossas.org>

ARG AWS_BUCKET=bonde-assets-staging
ARG AWS_ACCESS_KEY_ID=1
ARG AWS_SECRET_ACCESS_KEY=1
ARG NODE_ENV=staging
ARG APP_DOMAIN=staging.bonde.org
ARG API_URL=http://server.staging.bonde.org
ARG GOOGLE_FONTS_API_KEY=1
ARG PAGARME_KEY=1

ENV NEW_RELIC_HOME=./src NODE_MODULES_CACHE=false NPM_CONFIG_PRODUCTION=false PORT=5001

RUN mkdir /code
WORKDIR /code

COPY package.json yarn.lock /code/
RUN yarn
COPY . /code

RUN touch .env
RUN AWS_BUCKET=$AWS_BUCKET \
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    GOOGLE_FONTS_API_KEY=$GOOGLE_FONTS_API_KEY \
    PAGARME_KEY=$PAGARME_KEY \
    NODE_ENV=$NODE_ENV \
    APP_DOMAIN=$APP_DOMAIN \
    API_URL=$API_URL \
    yarn heroku-postbuild

CMD ["yarn", "start:prod"]

EXPOSE 5001
