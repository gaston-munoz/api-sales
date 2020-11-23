FROM node:latest

RUN mkdir -p /usr/src/my_first_app

WORKDIR /usr/src/my_first_app

COPY package.json /usr/src/my_first_app/

RUN npm i yarn

RUN yarn

COPY . /usr/src/my_first_app

EXPOSE 3000

CMD [ "yarn", "start" ] 