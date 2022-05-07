FROM node:16.14-alpine

ENV HOME=/elice

WORKDIR $HOME/node_docker

COPY package*.json yarn.lock $HOME/node_docker/

RUN yarn install --silent --progress=false

COPY . $HOME/node_docker

ENTRYPOINT ["yarn", "build"]