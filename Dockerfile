FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM node:22

WORKDIR /app

COPY package*.json ./

ENV HUSKY=0 

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env .env
EXPOSE 8000
CMD ["npm", "start"]
