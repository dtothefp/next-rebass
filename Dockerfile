FROM node:12

MAINTAINER dtothefp

ARG SERVER_URL
RUN mkdir -p /usr/src/app

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN yarn

ENV SERVER_URL=$SERVER_URL
ENV NODE_ENV=production

RUN yarn lerna run build
RUN yarn build

EXPOSE 3000

CMD ["yarn", "serve"]
