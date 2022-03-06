# FROM node:16.13.1
 
# WORKDIR /app
# COPY ./frontend ./

# EXPOSE 3000

FROM node:16.13.1   
 
WORKDIR /app
 
COPY ./package.json ./
RUN rm -rf node_modules && npm cache clean --force && yarn cache clean --force && set http_proxy= && set https_proxy= && yarn config delete https-proxy && yarn config delete registry && yarn config delete proxy && npm config rm https-proxy && npm config rm proxy
COPY . .

EXPOSE 3000