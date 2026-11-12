FROM node:26.13.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm","run","start"]