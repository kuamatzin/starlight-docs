---
title: Folder structure
---

## Further reading

```
.gitignore
.prettierrc
README.md
__tests__
   |-- integration
   |-- unit
migrations
package-lock.json
package.json
scripts
   |-- archive
   |-- build.js
serverless.mjs
src
   |-- api
   |   |-- tenant
   |   |   |-- handler.js
   |   |   |-- index.js
   |   |   |-- validators
   |   |   |   |-- byId.js
   |   |   |   |-- create.js
   |   |   |   |-- update.js
   |-- models
   |   |-- connection.js
   |   |-- tenant.js
   |   |-- services
   |   |   |-- tenant.js
   |-- services
   |   |-- queues
   |   |   |-- elasticMQ-custom.conf
   |   |-- secrets
   |   |   |-- secret.js
   |-- shared
   |   |-- api
   |   |   |-- apiRoute.js
   |   |   |-- handler-resolver.js
   |   |-- constants.js
   |   |-- image-converter.js
   |   |-- knex-client.js
   |   |-- lambda-client.js
   |   |-- log.js
   |   |-- middlewares
   |   |   |-- parseResponse.js
   |   |   |-- validateInput.js
   |   |-- utils.js
```

# Project Documentation

This is a backend project built with the Serverless Framework on AWS using Node.js. Here is a breakdown of the project structure.

## Project Structure

### Root Directory

- `.gitignore`: Specifies intentionally untracked files to ignore when using Git.
- `.prettierrc`: Configuration file for Prettier, a code formatter.
- `README.md`: The markdown file that contains the project's documentation.
- `__tests__`: Contains all the test files for the project divided into integration and unit tests.
- `migrations`: Directory for database migration files.
- `package-lock.json` and `package.json`: NPM's configuration files which include the list of project dependencies.
- `scripts`: Contains script files for specific tasks like archiving and building.
- `serverless.mjs`: Serverless Framework configuration file.
- `src`: The source directory where the main application code resides.

### src Directory

- `api`: Contains the API endpoints handlers and validators.
- `models`: Contains the database models and services related to them.
- `services`: Contains services such as queues and secrets.
- `shared`: Contains shared utilities, constants, middlewares, and services.

#### api Directory

- `tenant`: Contains the handler, index, and validators for the tenant route.

#### models Directory

- `connection.js`: Database connection configuration file.
- `tenant.js`: Tenant model file.
- `services`: Services related to the tenant model.

#### services Directory

- `queues`: Contains configuration for queue services.
- `secrets`: Contains configuration for secret management.

#### shared Directory

- `api`: Contains utilities for API routes.
- `constants.js`: File for storing constant values.
- `image-converter.js`: Utility for converting images.
- `knex-client.js`: Utility for handling knex client connections.
- `lambda-client.js`: Utility for handling lambda client connections.
- `log.js`: Utility for logging.
- `middlewares`: Contains middleware functions.
- `utils.js`: File for storing utility functions.

## Testing

This project uses Jest for testing. The `__tests__` directory contains two subdirectories for different types of tests:

- `integration`: Contains integration tests.
- `unit`: Contains unit tests.

## Scripts

The `scripts` directory contains JavaScript files that automate certain tasks in the development process. The `build.js` file, for example, is used to build the project.

## Migrations

The `migrations` directory contains files that manage the state of your application's database. These files can create, modify, or delete tables, or insert and update data.

This documentation provides an overview of the project structure. For more detailed information, refer to the comments and documentation within each individual file.