FROM node:18-alpine

WORKDIR /app

VOLUME /app

EXPOSE 5173

CMD [ "npm", "run", "dev" ]