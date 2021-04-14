# hackTAMS Registration Site

This is the registration site for hackTAMS 2021! Our main site can be found at https://21.hacktams.org! This repository is still **heavily WIP**, so please contact @MichaelZhao21 for more info on how to contribute and join the hacktams team.

## Installation

Simply type `yarn install` to install the libraries!

Create `.env`:

```
MONGO_URL=[URL of mongodb instance (eg. 127.0.0.1:27017 or my-amazing-atlas-db.g349ds.mongodb.net)]
MONGO_USER=[Username to access mongodb (not needed if open access)]
MONGO_PASS=[Password to access mongodb (not needed if open access)]
```

## Execution

To develop the app, simply use the `yarn start` command, and it will use chokidar and listen for changes.

## Build

Finally, to build the app for production, use `yarn build`. The gulp script will bundle and parse all the files for production.
