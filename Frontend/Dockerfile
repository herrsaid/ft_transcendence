FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
 
RUN npm run build

# FROM nginx:alpine

# COPY --from=0 /usr/src/app/out /usr/share/nginx/html

# EXPOSE 80


# CMD ["nginx", "-g", "daemon off;"]

CMD [ "npm", "run", "dev" ]

