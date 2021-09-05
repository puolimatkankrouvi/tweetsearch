FROM node:12

WORKDIR /usr/bin/twitsearch/ui
COPY package*.json ./
RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm","start"]