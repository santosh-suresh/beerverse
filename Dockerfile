FROM node:8
WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn install

COPY . .
EXPOSE 8080
CMD ["yarn", "-s", "test"]