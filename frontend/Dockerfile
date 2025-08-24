FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

ENV PORT=3001

CMD ["npm", "start"]