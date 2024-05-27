# Token Screen Interview app

This repository contains source files for Token Screen interview.

### Project stack:
<p align="center">
  <img src="https://skillicons.dev/icons?i=docker,nodejs,expressjs,postgresql,prisma,typescript,jest,heroku&perline=4" />
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)

## Introduction

Objective: Implement a RESTful JSON API with two endpoints allowing for the
creation and retrieval of "token" records in a PostgreSQL database, reflecting the
dynamic and multifaceted nature of tokens in the cryptocurrency ecosystem.

## Features

- Database in PostgreSQL, schema and setup
- Express.js API with all CRUD actions for tokens, returning proper statuses depending on context
- Fully dockerized - setup is easily managed with single command
- Adminer - simple SQL client that allows to browse the data directly in DB

## Getting Started

Just clone the repo and you're ready to go.

```shell
git clone https://github.com/mblacharski/tokenscreen.git
```


### Prerequisites

To run this project locally, you need to have Docker and Docker Compose installed on your system.

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

These tools will be used to containerize and manage the project environment.

### Current deployment status

This app is deployed on Heroku as the Docker container.
You can visit [Application Swagger](https://tokenscreen-60baba01210f.herokuapp.com/api-docs) and test it from there.

### Installation

1. Enter project directory:

```shell
cd tokenscreen
```

2. Build the container:

```shell
docker-compose build
```

### Configuration

In order to run the app, the environment variables should be properly set.

For the case of this project, all the values are set in .env file and the docker-compose.yaml is set up to pass the values to proper applications.


| Environment variable   | Description                                           |
|-------------------------|-------------------------------------------------------|
| APP_VERSION             | The version number of the application.                |
| APP_SQL_HOST            | The hostname of the PostgreSQL database server.       |
| APP_SQL_USER            | The username used to connect to the database.         |
| APP_SQL_PASSWORD        | The password used to connect to the database.         |
| APP_SQL_DB              | The name of the PostgreSQL database.                  |
| APP_SERVER_PORT_INNER   | The port on which the application server listens internally. |
| APP_SERVER_PORT_OUTER   | The port on which the application server is accessible externally. |
| APP_SERVER_URL          | The base URL of the application server.               |

## Usage

### Server

1. Run built container:

```shell
docker-compose up
```

2. Open [Swagger API docs](http://localhost:8080/api-docs) in your browser.

3. Use Swagger's built in features that allow to test the API.

Alternative:

1. Open Postman or any other REST client.

2. Use the endpoints according to Swagger documentation.


To stop the container, run the following command:

```shell
docker-compose down
```

And to remove the container, run:

```shell
docker-compose rm
```

### Adminer
In order to check the database contents, open [Adminer's local instance](http://localhost:8282) in your browser and fill the data with following:

- server: `db`
- username: `tokens_root`
- password: `some_very_secret_password`
- database: `tokens_db`

Note: container must be up.


## Testing

In order to run the unit tests, run the following command:

```shell
npm run test
```

Note: The tests are automatically triggered before the build process in docker-compose.
