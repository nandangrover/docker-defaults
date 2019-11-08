<p align="center">
  <img  alt="docker for dummies" height="128px" width="128px" src="https://miro.medium.com/max/630/1*j_zP74-cpvXRcs8dM_pkMQ.jpeg">
</p>

Prototype for Docker Defaults

## Objective
- Make docker defaults for prod and dev for kickstarting a project easy way

## Environment
- Server: mongo + node + express + graphql
- Client: react + apollo + redux

## Commands
-  `docker-compose build` 
-  `docker-compose up` (this kickstarts the nodemon environment too)

## Hosted links
- Open `localhost:80/api/graphql` for the local server environemt
- Open `localhost:3001` for the local client environemt

## Production setup
- Set `NODE_ENV` variable in `Dockerfile` in client and server to production.
- Change the last command in `Dockerfile` for client to `npm run build`.
- Change the last command in `Dockerfile` for server to `npm start`.
