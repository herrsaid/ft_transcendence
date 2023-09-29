FROM node:18.17.1

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install 

COPY . .


RUN npm run build

EXPOSE 1337


CMD [ "npm", "run", "start" ]
