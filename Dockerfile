FROM node:14

# ARG NAME:DEFAULT_VALUE
ARG DEFAULT_PORT=80

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

# set default envinronment variable
# ENV PORT 80

# use PORT as variable
# EXPOSE $PORT


# anomymous volume creation
# VOLUME [ "/app/feedback" ]

# CMD [ "node", "server.js" ]

EXPOSE 3000

CMD [ "node", "app.mjs" ]

