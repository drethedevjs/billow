FROM node:24-slim

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build
CMD npm run dev