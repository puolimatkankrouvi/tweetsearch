FROM node:12

WORKDIR /usr/bin/tweetsearch/ui as build
COPY package*.json ./
RUN npm install --silent

COPY . .

RUN npm run build

FROM nginx:alpine

# Ngix default directory for serving.
WORKDIR /usr/share/nginx/html

# Remove default nginx assets.
RUN rm -rf ./*

COPY --from=build /usr/bin/tweetsearch/ui/build .

# Global turn off daemon directive.
ENTRYPOINT ["nginx", "-g", "daemon off"]