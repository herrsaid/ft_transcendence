FROM node:20 AS builder

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20


WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public


EXPOSE 3000


CMD ["npx", "next", "start"]

