#first step
FROM node:15.10.0-alpine3.10 as builder
WORKDIR /usr/app
COPY package.json .
COPY . .
RUN npm install

#final step
FROM keymetrics/pm2:15-alpine
COPY --from=builder /usr/app .
CMD ["pm2-runtime", "ecosystem.config.js"]
