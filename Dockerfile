FROM node:alpine
WORKDIR /app
EXPOSE 4000

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

CMD npm run start