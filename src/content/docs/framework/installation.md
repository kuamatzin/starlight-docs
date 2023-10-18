---
title: Install Project
---

Follow these steps to install the project:

## Step 1: Download the Repository

First, you need to download the repository from GitHub. You can do this by visiting the following URL: [https://github.com/kofile/esubmission-api](https://github.com/kofile/esubmission-api)

## Step 2: Install Node.js

This project requires Node.js v18. If you don't have it installed, you can download it from the official Node.js website: [https://nodejs.org/](https://nodejs.org/)

## Step 3: Install the Dependencies

Once Node.js is installed, navigate to the project directory in your terminal and run the following command to install the project dependencies:

```bash
npm install
```

## Step 4: Create a Database

This project uses a PostgreSQL database. You need to create a new database with the name `esubmit-dev-submission`. Make sure you have PostgreSQL installed and running on your machine.

## Step 5: Run the Migrations

After the database is set up, you can run the migrations with the following command:

```bash
sls invoke local -e IS_OFFLINE=true -e DB_ESUBMISSION_NAME=esubmit-dev-submission -f migrateDatabase -d "{\"command\":\"latest\"}"
```

This command uses the Serverless Framework to invoke a local function that runs the latest migrations on the database.

## Step 6: Start the Development Server

Finally, you can start the development server with the following command:

```bash
npm run start:dev
```

This command uses Nodemon to start the Serverless Offline plugin, which simulates AWS Lambda and API Gateway on your local machine. Nodemon will automatically restart the server whenever you make changes to your code.