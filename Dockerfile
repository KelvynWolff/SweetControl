FROM node:22 AS base

WORKDIR /usr/src/app

FROM base AS dependencies
COPY package*.json ./
RUN npm install

FROM dependencies AS build
COPY . .
RUN npm run build

FROM base AS production

COPY --from=build /usr/src/app/package*.json ./

RUN npm ci --omit=dev # 'ci' é mais rápido e seguro para produção
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "node", "dist/main" ]