## Description

A REST API for calculating steering directions for Crafty

## Configuration
```bash
$ Default Port is 3000
```

## Installation

```bash
# install CLI for framework used(NestJS)
$ npm install -g @nestjs/cli

# install dependicies
$ npm install
```

## Running the app

```bash
# prod
$ npm run start

# watch mode
$ npm run start:dev

```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Bulding image and running it inside a container

```bash
# building image
$ docker build -t crafty .

# running container with image
$ docker run -d --name crafty -p 3000:3000 crafty
```

## Endpoints
```bash
$ GET /direction

  # Query Strings
  - heading: number
  - target: number

   # Sample request
   http://localhost:3000/direction?heading=310&target=75
```
