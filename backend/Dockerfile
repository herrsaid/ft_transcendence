FROM node:20

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install 

COPY . .

RUN npm install -g @nestjs/cli

RUN npm run build

EXPOSE 1337


CMD [ "npm", "run","start" ]

