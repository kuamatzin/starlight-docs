---
title: Services
---

In the context of this project, a service is a module that contains the business logic for handling requests to the API. Each service file contains several functions, each of which corresponds to a specific operation that can be performed on a resource. These operations include creating, reading, updating, and deleting (CRUD) entities, in this case, tenants.

## Structure

Each service file exports an object that exposes a number of functions. Each function is an asynchronous function that takes certain parameters and returns a Promise. The Promise resolves to an object that contains the HTTP status code, headers, and body of the response that should be sent back to the client.

The service functions use a helper function called `Service` to handle common tasks like setting up the database connection and handling errors. This helps to keep the service functions themselves clean and focused on their specific tasks.

## Example: TenantService

Here's an example of a service file, `tenantService.js`:

```javascript
import { Tenant } from "../tenant.js";
import Service from "./service.js";

const createTenant = async (bodyStr) => Service(() => {
  return Tenant.query().insertAndFetch(bodyStr);
});

const getTenant = async (parameters) => Service(() => {
  const findBy = {};
  if (parameters.id)
    findBy.id = parameters.id;
  else
    findBy.tenant_code = parameters.tenant_code;

  return Tenant.query().findOne(findBy);
});

const updateTenant = async (id, body) => Service(() => {
  return Tenant.query().patchAndFetchById(id, body);
});

const deleteTenant = async (parameters) => Service(async () => {
  const numDeleted = await Tenant.query().delete().where({ id: parameters.id });

  if (numDeleted > 0)
    return "Deleted tenant id: " + parameters.id + ".";
  else
    throw new createError(constants.INTERNAL_SERVER_ERROR_STATUS_CODE, "Unable to delete tenant id: " + parameters.id, { expose: true });
});

const TenantService = {
  createTenant,
  getTenant,
  updateTenant,
  deleteTenant
};

export default TenantService;
```

## Service Wrapper

The `Service` function is a higher-order function that takes a function as an argument and returns a new function. This new function sets up the database connection, executes the provided function, and handles any errors that might occur.

Here's the definition of the `Service` function:

```javascript
import connection from "../connection.js";
import { Model } from "objection";
import { finishDbReturn } from "../../shared/utils.js";
import createError from 'http-errors'
import constants from "../../shared/constants.js";

const Service = async (fn) => {
  Model.knex(connection);

  try {
    return finishDbReturn({
      data: await fn()
    });
  } catch (error) {
    throw new createError(constants.INTERNAL_SERVER_ERROR_STATUS_CODE, error, { expose: true });
  }
};

export default Service;
```

The `Service` function sets up the database connection using the `knex` method from the `objection` library. It then tries to execute the provided function. If the function completes successfully, it wraps the return value in an object and passes it to the `finishDbReturn` function, which prepares the response to be sent back to the client. If an error occurs while executing the function, the `Service` function catches it and throws a new error with a status code of 500.