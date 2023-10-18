---
title: Routing
---

In our backend, we have organized our service routes in a `routes.js` file, which is a part of each service. This structure allows us to define, manipulate, and manage our function definitions dynamically using a script, instead of defining them directly in the `serverless.js` file. This approach provides us with more flexibility and control over our function definitions.

## Service Routes

Our service routes are defined in a constant object called `serviceRoutes`. Each key in this object represents a service and the value is an array of route objects. Each route object has three properties: `path`, `method`, and `handler`.

Here is an example of the `serviceRoutes` object for the document service:

```javascript
const serviceRoutes = {
  document: [
    {
      path: "document",
      method: "post",
      handler: { createDocument }
    },
    {
      path: "document/{id}",
      method: "get",
      handler: { getDocument }
    },
    {
      path: "document/{id}",
      method: "put",
      handler: { updateDocument }
    },
    {
      path: "document/{id}",
      method: "delete",
      handler: { deleteDocument }
    }
  ]
};
```

## Handling Routes

The `handleRoutes` function is used to process the `serviceRoutes` object and create the function definitions for the serverless framework. This function takes the `serviceConfig` object as an argument and returns an object with handler function definitions.

Here is the `handleRoutes` function:

```javascript
export const handleRoutes = (serviceConfig) => {
  const serviceName = varToString(serviceConfig);
  let handlerFunctions = {};
  serviceConfig[serviceName].map((route) => {
    const fnName = varToString(route.handler);
    handlerFunctions[fnName] = {
      handler: `src/api/${serviceName}/handler.${fnName}`,
      events: [
        {
          http: {
            method: route.method,
            path: route.path
          }
        }
      ]
    };
  });

  return handlerFunctions;
};
```

The `handleRoutes` function iterates over each route in the `serviceConfig` object, and for each route, it creates a function definition in the `handlerFunctions` object. The function definition includes the path to the handler function and the HTTP event associated with the function.

The `handleRoutes` function is exported and used to process the `serviceRoutes` object:

```javascript
export default handleRoutes(serviceRoutes);
```

By using this approach, we can dynamically generate our function definitions and keep our `serverless.js` file clean and manageable.