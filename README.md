## REMNI TEST BACKEND

- This is a simple test project back-end, provide APIs to the web [Funny Movies](https://remi-test-web-673dcc75836e.herokuapp.com/) ([source code web](https://github.com/tientd58/remi-test-frontend))
- Technical: [Nodejs](https://nodejs.org/en/), [Expressjs](https://expressjs.com/), [Mongodb](https://www.mongodb.com/), [Socket.io](https://socket.io/) [Jsonwebtoken](https://jwt.io/), [Bull](https://github.com/OptimalBits/bull#readme), [Redis](https://redis.io/), [Javascript](https://www.javascript.com/) ...etc

## Required
1. Install Nodejs [click here](https://nodejs.org/en)
2. Install Mongodb [click here](https://docs.mongodb.com/manual/installation)
3. MongoDB cloud services account [click here](https://www.mongodb.com/cloud) if you want to deploy mongodb to cloud
4. Install Redis [click here](https://redis.io/docs/getting-started/installation/)
5. Redis labs account [click here](https://app.redislabs.com/#/) if you want deploy redis to cloud
6. Heroku account [click here](https://heroku.com) if you want to deploy with heroku

## Use for development
1. `git clone https://github.com/tientd58/remi-test-backend`
2. `yarn` || `npm install`
3. Start local mongodb server: `mongod`. Create a database local by a tool (recommend: MongoDB Compass)
4. Add ENV files for 3 environments: development, staging, production with the format `.env.<env name>`, the variable names referenced in the    file `.env.example`
5. Start Redis server: `redis-server`. Local server has the host url default is `127.0.0.1` with port `6379`
6. Start local (development) server: `yarn dev` or `npm run dev`
7. Start staging server: `yarn stg` or `npm run stg`
8. Start production server: `yarn prod` or `npm run prod`

## Deployment with heroku
- Refer: [Guide](https://devcenter.heroku.com/articles/deploying-nodejs)

## Done
1. Config project Nodejs Express with javascript
1. Deploy with heroku
2. Integrate JWT Webtoken in server
3. Build REST API
1. Integrate Socket.io and background job with Redis + Bull to handle push notification to end-users

## Relation
2. Api with express see more [click here](https://expressjs.com/en/guide/routing.html)
3. Database with mongoosejs see more [click here](http://mongoosejs.com/docs/guide.html)

## Demo [link api here](https://remi-test-backend-5d08e2f9eee0.herokuapp.com/)

## Licence: MIT
