FROM node:8-alpine
WORKDIR /app
COPY package.json /app
COPY server.js /app
COPY ./controllers/* /app/controllers/
COPY ./models/* /app/models/
COPY ./services/* /app/services/

RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]
