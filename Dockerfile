FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npm run build

FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY .env .env
EXPOSE 8000
CMD ["npm", "start"]
