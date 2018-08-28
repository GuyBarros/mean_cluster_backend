FROM mhart/alpine-node:latest
COPY serve.js package.json package-lock.json ./
RUN npm ci
ARG port
CMD ["node", "serve", "--port="$port ]