FROM node:12

MAINTAINER dtothefp

RUN mkdir -p /usr/src/app

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN yarn
RUN yarn lerna run build
RUN yarn build
ENV NODE_ENV=production

EXPOSE 3000

CMD ["yarn", "serve"]
