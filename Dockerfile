FROM node:20.18.0-alpine

WORKDIR /server

COPY server/package.json .

RUN npm install

COPY server/ .

RUN npm install &&\
    chown 2000:2000 -R .

USER 2000:2000

EXPOSE 3000

CMD ["npm", "run", "dev"]
