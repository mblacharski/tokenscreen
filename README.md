# Token Screen Interview app

This repository contains source files for Token Screen interview.

### Project stack:
<p align="center">
  <img src="https://skillicons.dev/icons?i=docker,nodejs,expressjs,postgresql,prisma,typescript,jest,heroku&perline=4" />
</p>

- Docker
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- TypeScript
- Jest
- Heroku

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

## Context

In the cryptocurrency industry, a token represents a unit of value issued by a project
or company and is built on top of an existing blockchain infrastructure, such as
Ethereum. Tokens can serve various purposes including representing assets,
facilitating transactions within a project's ecosystem, or granting holders certain
rights or privileges. They are an integral part of decentralized applications (dApps)
and decentralized finance (DeFi) operations.

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

2. Use the endpoints according to [Swagger documentation](http://localhost:8080/api-docs).


To stop the container, run the following command:

```shell
docker-compose down
```

And to remove the container, run:

```shell
docker-compose rm
```

#### API Endpoints

All the payloads and statuses can be checked in [Local Swagger documentation](http://localhost:8080/api-docs) or [Deployed Swagger documentation](https://tokenscreen-60baba01210f.herokuapp.com/api-docs). Here's short overview:

- `GET /tokens` - returns list of all available tokens (or `500` status with error message if server fails)
- `GET /tokens/{id}` - returns token with given `id` or `404` status code with error message
- `POST /tokens` - adds token to the database and returns `201` status code on success with full created object data in body or `400` status with error message in case of bad request, or `500` status with error message in case of server error. `id` value is ignored on `POST` action as it is auto-incremental
- `PUT /tokens/{id}` - updates the token data with given `id` using full token body (except the `id`). This is used to fully update the token. Returns `200` on success with updated object data in body, `404` status with error message if object is not found, `400` status with error message in case of bad request or `500` status with error message in case of server error
- `PATCH /tokens/{id}` - updates the token data with given `id` using partial token body. This is used to change single value of the token. Returns `200` on success with updated object data in body, `404` status with error message if object is not found, `400` status with error message in case of bad request or `500` status with error message in case of server error
- `DELETE /tokens/{id}` - deletes the token with given `ID`. Returns `200` status code on success with deleted token data, `404` status with error message if object is not found or `400` in case of bad `id` format

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

## Considerations

Here are some thoughts over the project: 
- API should be secured with bearer tokens in real-life implementation
- TokenManager could implement the abstract class that includes basic CRUD actions, so the data management could be consistent with all the other data managers. It's not implemented right now in order not to overcomplicate the project structure for this simple task, but would be helpful while working with many tables and implementing consistent API
- This kind of project could be implemented with Nest.js - that would simplify the code as lots of repeatable actions are already implemented (for instance: validating the `ID` format even before it is passed to the route handler)
- if I understand the data structure correctly, there is no need for auto-increment token `ID` column as the tokens are mapped to the tickers `one-to-one`, which means that the `primary key` could be set on the `ticker` column, which would minimize the DB's size and prevent accidental `many-to-one` mapping
