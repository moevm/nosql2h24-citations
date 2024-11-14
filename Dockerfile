FROM alpine:3.19

RUN apk --no-cache add \
    nodejs \
    npm

WORKDIR server

COPY server/package.json .

RUN npm install

COPY server/ .

RUN npm install

RUN chown 2000:2000 -R .

USER 2000:2000

EXPOSE 3000

CMD ["npm", "run", "dev"]
