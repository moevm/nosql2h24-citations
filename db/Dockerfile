FROM mongo:5.0.25
WORKDIR /
COPY init.js /docker-entrypoint-initdb.d/mongo-init.js
CMD ["mongod", "--port", "27017"]
