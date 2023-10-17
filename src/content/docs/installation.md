---
title: Getting Started
description: A guide in my new Starlight docs site.
---

<a name="readme-top"></a>

<h3 align="center">eSubmission Integration API</h3>

## Overview
<p>
  This project serves as the backend of the eSubmission frontend web application, providing data access to the eSubmission Aurora Serverless PostgreSQL database and server side data processing. This project provides REST APIs, utilizing the AWS API Gateway to invoke AWS Lambda Functions.
</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Description
<p>
  The eSubmission Integration API integrates with the AWS Secrets Manager to aquired RDS Proxy credentials, which creates and maintains shared connections in a pool. RDS Proxy forwards a connection to the RDS datbase. For data access, the APIs use Objection (ORM) and Knex Schema/Query Builder.
</p>
The APIs provide basic CRUD operations for creating, reading, updating and deleting records for the following tables:

Table | Description
------------- | -------------
additional_config | Defines additional tenant specific configuration.
contact_info | Defines name and address information used to populate field data.
document | Defines the main document information.
document_data | Defines one or more instances of additional document information.
document_type | Defines the document type for each document.
document_type_fee_formula_xref | Joins multiple fee formulas to multiple documents types.
fee_formula | Defines the fee calculation for document types.
package | Defines the main package information.
package_audit | Defines the old and new package data when the package is updated.
package_data | Defines one or more instances of additional package information.
package_status | Defines the package status.
tenant | Defines tenant data.
ui_config | Defines field components and their layout per tenant and document type.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With
* [[Node]][Node-url]
* [[AWS SDK]][AWS SDK-url]
* [[Objection]][Objection-url]
* [[Knex]][Knex-url]
* [[Node Postgres]][Node Postgres-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Project Details
### Inputs and Outputs
<p>
  The inputs are JSON request objects or query strings. The outputs are JSON response objects.
</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Required Environment Configuration
The following environment variables are required:
Name | Description
------------- | -------------
DB_ESUBMISSION_NAME | Name of Aurora Serverless PostgreSQL Database
DB_PROXY_ADDR | RDS Proxy Host
DB_PROXY_PORT | RDS Proxy Port
SECRETS_MANAGER_SECRET_DB_ESUBMISSION_USER | Secret for RDS Proxy Credentials
SECRETS_MANAGER_REGION | Secrets Manager region
LAMBDA_REGION | Lambda Region
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Required System Libraries
The following system libraries are required:
Name | Description
------------- | -------------
Node Version | 18.16.1
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### External Dependencies
The following external dependencies are required:
Name | Description
------------- | -------------
AWS Aurora Serverless | Postgres 15
AWS RDS Proxy | Host and Port
AWS Secrets Manager | RDS Proxy Credentials
AWS API Gateway | HTTP Requests
AWS Lambda Functions | IAM
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Other Requirements
The latest migrations need to be executed to keep the schema up to date.
Migrations are executed from a Lambda Function, which can be invoked using the following commands:

EC2 instance:
aws lambda invoke --function-name=esubmit-dev-migrateDatabase --region=us-west-2 --payload='{"command":"latest"}'

Serverless Offline:
sls invoke local -e IS_OFFLINE=true -e DB_ESUBMISSION_NAME=esubmit-dev-submission -f migrateDatabase -d "{\\"command\\":\\"latest\\"}"
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Resource Usage
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Build Details
### Unit Tests
Unit tests use "mock-knex" package to mock the Knex query builder. Unit tests do not access the RDS database.
Command: npm test
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Integration Tests
Integration tests require environment variable:
Name | Description
------------- | -------------
API_GATEWAY_URL | API Gateway URL

Inegration tests invoke the API Gateway/Lambda Functions and will access the RDS database and remove test data as part of the tests.
Windows Command: $env:API_GATEWAY_URL="https://restApiId.execute-api.us-west-2.amazonaws.com/test/" ; npm run integration ; $env:API_GATEWAY_URL=$null
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Build Process
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
[Node-url]: https://nodejs.org/en
[AWS SDK-url]: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/
[Objection-url]: https://vincit.github.io/objection.js/
[Knex-url]: https://knexjs.org/
[Node Postgres-url]: https://node-postgres.com/


<!--
Acceptance criteria

1. README
   A README file exists at the top level of the project's code repository. The
   file contains:

   A. An overview of the relationship between the project and its parent project
      Example:
         This program is a Cloud Access backend microservice.

   B. A plain English description of the project's function
      Example:
         This Node.js program accepts HTTP requests related to document filings.
         For each valid filing submission, the program stores filing data in
         object storage and emits an AMQP message to the Kofile Filing Service
         queue. The program also responds to filing status requests.

   C. A brief description of inputs & outputs
      Example:
         This program accepts control input exclusively via Remote Procedure
         Calls. It outputs AMQP messages, and also periodically POSTs formatted
         status reports to the Report Collector service.

   D. Required environment configuration
      Example:
         The following environment variables are required:
            BIND_ADDR
            BIND_PORT
            CONFIGURATION_SERVICE_URL
            DB_HOST
            DB_PORT
            DB_NAME
            DB_USER
            DB_PASS
            JWT_ISSUER_PRIV_KEY
            LOG_LEVEL
            NODE_ENV
            RABBITMQ_VHOST
            USE_TLS

   E. Required system libraries
      Exmaple:
        The following system libraries are required:
           libpng
           libtiff

   F. External dependencies
      Example:
         The program won't start without:
            AWS S3 (write-only access)
            configuration-service
         The program relies on for full functionality:
            SMTP mail sender

   G. Other requirements
      Example:
         This program requires .NET 5 and will NOT run self-contained.

   H. Resource usage, to the extent known
      Example:
         This program is multi-core aware, and is capable of efficiently
         utilizing up to 16 simultaneous cores. The number of cores available
         to the program should be specified in the AVAILABLE_CORES environment
         variable.

         This program requires no less than 2 GB of system memory to be able to
         parse an expected 10k rows of CSV data.

         This program writes large (up to 5 GB each) temporary files to disk.
         Under normal expected use, there may be up to 5 such temp files in use
         simultaneously.

   Note that a README file is an addition to, not a substitute for, other
   thorough documentation.

2. Unit tests
   A. Instructions exist describing how to execute unit tests
   B. At least one unit test exists
   C. All existing unit tests pass

3. Integration tests
   A. Instructions exist describing how to execute integration tests
   B. At least one integration test exists
   C. All existing integration tests pass

4. Build process
   A. Instructions exist describing how to build an artifact^
   B. Build steps produce a working artifact

   Example:
      To build, test, and archive an artifact for this program, execute the
      following command sequence:
         git clone ssh://git@github.com/kofile/laminar-service
         cd laminar-service
         npm install
         npm run build
         npm run test
         npm run archive

   ^ An artifact is a deployable object that contains the project in a runnable
   form, and complies with Kofile's deployment scheme (e.g. a compiled binary
   accompanied by support files in a .deb package, Node.js source code and
   node_modules gzipped into a file named for the branch HEAD).
>
