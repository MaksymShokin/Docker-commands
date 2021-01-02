import express from 'express';

import connectToDatabase from './helpers.mjs'

const app = express();

app.get('/', (req, res) => {
  res.send('<h2>Hi there!</h2>');
});

await connectToDatabase();

app.listen(3000);

// flags
// -d detached mode
// -p 3000:3000 open port 
// --rm remove container after closing
// -it interactive mode

// Builds images based on Dockerfile provided
// docker build .

// Build a container based on image ID 
// docker run -p 3000:3000 0815c07998355847df011d0f263a54845c6978444888a1f364772957f102648a 

// run in detached mode
// docker run -p 3000:3000 -d 0815c07998355847df011d0f263a54845c6978444888a1f364772957f102648a 

// attach container
// docker container attach CONTAINER_NAME

// start container in attached mode 
// docker start -a CONTAINER_NAME

// see container logs
// docker logs CONTAINER_NAME
// follow logs
// docker logs -f CONTAINER_NAME

// see all running dockers 
// docker ps

// see all docker 
// docker ps -a

// docker stop affectionate_brahmagupta

// remove containers
// docker rm NAMES
// remove all containers
// docker container prune

// remove images
// docker rmi NAMES
// remove all images
// docker image prune
// remove all images including tagged image
// docker image prune -a

// inspect image
// docker image inspect IMAGE_ID

// copy files from/to 
// docker cp test.txt happy_maxwell:/test
// docker cp happy_maxwell:/ test.txt

// from everything from folder
// docker cp dummy/.  happy_maxwell:/test

// assign name to container 
//  docker run -p 3000:3000 -d --name NAME IMAGE_ID
// docker run -p 3000:3000 -d --rm --name fuckyeah bd1560d4e6d7

// assign name to image
// docker build -t NAME:TAG(OPTIONAL) .

// rename image
// docker tag REPOSITORY_NAME:TAG_NAME NEW_NAME:NEW_TAG(OPTIONAL)

// push image to dockerhub 
// docker push maksymsh1/node-first-image:tagname

// pull image from docker hub
// docker pull NAME

// see all created volumes
// docker volume ls

// create container with named volume
// docker run -p 3000:80 --rm -v supervolume:/app/feedback IMAGE_ID

// remove volumes 
// docker volume rm VOL_NAME or docker volume prune

// adding bind mount
// docker run -p 3000:80 -v supervolume:/app/feedback -v "/Users/maksym1/Desktop/Max.nosync/Docker/VolumeNodeProject:/app" -v /app/node_modules f6da757fc86f 

// adding nodemon to docker
// add dev dependencies
// add scripts
// change cmd to ["npm", "start"]
// rebuild image

// making container read only
// so we add ro flag after it and also we add temp folder where we actually need to write
// // docker run -p 3000:80 -v supervolume:/app/feedback -v "/Users/maksym1/Desktop/Max.nosync/Docker/VolumeNodeProject:/app:ro" -v /app/node_modules -v /app/temp f6da757fc86f 

// we can add .dockerignore file

// set ENV variable in docker run command
// -e NAME=VALUE

// set ENV variable in docker run command example
// docker run -d  -p 3000:4000 -e PORT=4000  -v supervolume:/app/feedback -v "/Users/maksym1/Desktop/Max.nosync/Docker/VolumeNodeProject:/app:ro" -v /app/node_modules -v /app/temp node:with_env

// set ENV variable in a file
// add .env file with key value pairs PORT=8000
// specify env file in docker run command --env-file ./.env
// example using .env file docker run -d  -p 3000:7000 --env-file ./.env  -v supervolume:/app/feedback -v "/Users/maksym1/Desktop/Max.nosync/Docker/VolumeNodeProject:/app:ro" -v /app/node_modules -v /app/temp node:with_env

// build image with args injection
// docker build --build-arg DEFAULT_PORT=8000 .

// docker local host
// host.docker.internal

// run container based on MONGODB image from dockerhub
// docker run mongo

// inspect container
// docker container inspect NAME 

// create docker network
// docker network create NAME

// all available networks 
// docker network ls

// create container based on network
// docker run -d --name mongodb --network node-network mongo
// docker run -d --name NAME_OF_CONTAINER --network NAME_OF_NETWORK IMAGE_NAME

// container communication
// connect to local host database
// 'mongodb://host.docker.internal/swfavorites',
// connect by IP address of another container 
// 'mongodb://172.17.0.2:27017/swfavorites',
// connect by container name of another network
// 'mongodb://mongodb:27017/swfavorites'

// section 5 multiapp setup
// WITHOUT NETWORK
// connect mongodb 
// docker run --name mongodb --rm -d -p 27017:27017 mongo
// connect node
// create dockerfile
// change mongo port to host.docker.internal
// build image
// docker run --name node-goals --rm -d -p 80:80 node:goals
// connect react 
// create docker file
// build image
// docker run -d --rm -p 3000:3000 -it --name react-goals react:goals

// WITH NETWORK
// docker network create goals-network
// connect mongodb
// docker run --name mongodb --rm --network goals-network mongo
// connect node 
// change name to mongodb and build image
// docker run --rm -d --name node-goals -p 80:80 --network goals-network node:goals
// connect react
// docker run --rm -d -p 3000:3000 -it --name react-goals react:goals

// MONGO DATA PERSISTANCE WITH SECURITY
// docker run --name mongodb -v goals-data:/data/db --rm -e MONGO_INITDB_ROOT_USERNAME=goals -e MONGO_INITDB_ROOT_PASSWORD=qwerty --network goals-network mongo
// change connect method to   'mongodb://goals:qwerty@mongodb:27017/course-goals?authSource=admin',
// rebuild node image

// NODE DATA PERSISTANCE AND BIND MOUNT
// add nodemon
// rebuild image
// docker run --rm -p 80:80 -v /Users/maksym1/Desktop/Max.nosync/Docker/Section5.MultiApp/multi-01-starting-setup/backend:/app -v /app/node_modules -v goals-logs:/app/logs/ --network goals-network --name node-goals node:goals
// (optional) use env variables for mongo password and username
// add in docker file 
// ENV NAME=DEFAULT_VALUE
// ENV MONGODB_USERNAME=root
// ENV MONGODB_PASSWORD=secret
// use them in node js code
// process.env.MONGODB_USERNAME
// add values by added -e MONGODB_PASSWORD=secret in docker run command

// REACT BIND MOUNT
// docker run --rm -d -p 3000:3000 -it --name react-goals -v /Users/maksym1/Desktop/Max.nosync/Docker/Section5.MultiApp/multi-01-starting-setup/frontend/src:/app/src react:goals

// DOCKER COMPOSE
// start docker
// docker-compose up
// detached mode
// docker-compose up -d
// stop docker compose 
// docker-compose down
// remove volumes 
// docker-compose down -v
