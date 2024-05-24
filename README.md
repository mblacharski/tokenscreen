# tokenscreen

## Interview app

This repository contains source files for Token Screen interview


## Prerequisites

In order to run this project, you should have installed:
- Docker
- Docker Compose 

## How to install

Just clone the repo and you're all set.

```shell
git clone https://github.com/mblacharski/tokenscreen.git
```

## How to run

1. Enter project directory

```shell
cd tokenscreen
```

2. Build the app

```shell
docker-compose build
```

3. Run

```shell
docker-compose up
```

...or combine the two above with:

```shell
docker compose up -d --build
```

## Application

This application includes:
- PostgreSQL database schema, setup and server
- Node.js (express.js-based) server with `GET /tokens/{id}` and `POST /tokens` endpoints
- Simple client which allows to test the implementation
- Adminer - simple SQL client that allows to browse the data directly in DB

# How to use it?

## Adminer

- server: `database`
- username: `tokens_root`
- password: `some_very_secret_password`
- database: `tokens_db`
