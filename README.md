# Music Library

This repository contains an app that I built as a project for Command Shift bootcamp. It connects to a database and allows the user to create, read, update and delete data relating to artists and albums.

This app was created using the NPX script `@command-shift/create-backend-app`.

## Getting started

### Set up the database

- Install Docker
- Pull and run a postgres image to create a container
- Install pgAdmin
- Add a new server for the database

### Clone this repository

- Create a fork of this repo.
- Clone your copy of the repo using the command: `git clone git@github.com:_your-github-username_/music-library`.

### Install the project dependencies

Use the command `npm install` to download the project's dependencies:

- `pg`
- `express`
- `postgres-migrations`

## Run the test code

Use the command `npm test` to run the integration tests.

## Use Postman to interact with the database

- Use the command `npm start` to start your server.
- Open Postman and enter http://localhost:3000.
- See the table below for routes and methods for each operation.
- When using routes that contain `:id`, you will need to replace this in your request with the ID number of the artist or album you are targeting.
- If you want to add an album to the database, you will need to add the artist first.
- For POST and PUT requests, you will need to add information to the request body. Select `Body` and `raw`, then select JSON from the dropdown. Data in the request body should be written in JSON format.
- POST and PUT requests for artists will need `name` and `genre` data e.g.

```
{
  "name": "test",
  "genre": "rock"
}
```
- POST and PUT requests for albums will need `name`, `year` and `artistId` data e.g.

```
{
  "name": "test",
  "year": 2023,
  "artistId": 1
}
```

### Artists

| Route        | HTTP Verb | Description               |
| ------------ | --------- | ------------------------- |
| /artists     | POST      | Creates an artist         |
| /artists     | GET       | Returns all artists' data |
| /artists/:id | GET       | Returns an artist's data  |
| /artists/:id | PUT       | Replaces an artist's data |
| /artists/:id | DELETE    | Deletes an artist's data  |

### Albums

| Route                     | HTTP Verb | Description              |
| ------------------------- | --------- | ------------------------ |
| /artists/:artistId/albums | POST      | Creates an album         |
| /albums                   | GET       | Returns all album data   |
| /albums/:id               | GET       | Returns an album's data  |
| /albums/:id               | PUT       | Replaces an album's data |
| /albums/:id               | DELETE    | Deletes an album's data  |
