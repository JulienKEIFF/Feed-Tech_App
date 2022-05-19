FROM node:16.15.0-alpine3.15
WORKDIR /feed_tech_server
COPY ./server .
RUN npm i
CMD [ "node", "./bin/www" ]