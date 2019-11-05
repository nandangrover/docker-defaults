# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:8-alpine also works here for a smaller image
FROM node:10

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 5000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT 9229 9230 4000


RUN npm i npm@latest -g


RUN mkdir /opt/server_app && chown node:node /opt/server_app
WORKDIR /opt/server_app

USER node

COPY package.json /opt/server_app
COPY package-lock.json /opt/server_app

RUN npm install --no-optional && npm cache clean --force

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY . /opt/server_app

# npm start for production
CMD [ "npm", "run", "start-watch"]