FROM node:10-alpine

# Create app directory
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app

# Install app dependencies
RUN npm  install --prod
COPY . /app
EXPOSE 3000

HEALTHCHECK CMD [ "wget", "localhost:3000" ]

CMD ["node", "app.js"]