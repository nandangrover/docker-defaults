# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:8-alpine also works here for a smaller image
FROM node:10

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 4200 49153

RUN npm i npm@latest -g


RUN mkdir /opt/client_app && chown node:node /opt/client_app
WORKDIR /opt/client_app
# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node

COPY package.json /opt/client_app
COPY package-lock.json /opt/client_app

RUN npm install --no-optional && npm cache clean --force

# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY --chown=node:node . /opt/client_app

# npm run build for production
CMD [ "npm", "start"]