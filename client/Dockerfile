FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /home/client-bonzitech

COPY ["package-lock.json", "package.json", "./"]

RUN npm install

COPY . .

EXPOSE 3301

CMD [ "npm", "start" ]
