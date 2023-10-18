---
title: Middlewares
---

Middlewares in a serverless architecture are custom functions that are executed before or after your main function. They allow you to separate concerns and reuse common code across your functions. In our system, we use the middy library to handle middlewares.

## Default Middlewares

We use a set of default middlewares which are applied to every function. These include:

- `httpHeaderNormalizer`: This middleware normalizes HTTP header names to lowercase. This can help prevent errors due to case sensitivity. [More info](https://middy.js.org/docs/middlewares/http-header-normalizer)

- `httpJsonBodyParser`: This middleware parses the HTTP request body and converts it into a JSON object. It also handles parsing errors and prevents the function from being invoked in case of an invalid JSON body. [More info](https://middy.js.org/docs/middlewares/http-json-body-parser)

- `httpErrorHandler`: This middleware handles common HTTP errors and automatically generates the appropriate error responses. It also handles thrown errors from the business logic and generates the appropriate error responses. [More info](https://middy.js.org/docs/middlewares/http-error-handler)

- `httpResponseSerializer`: This middleware parses the response body and converts it into a JSON object.

## Custom Middlewares

In addition to default middlewares, we also support custom middlewares. These can be specified in the `options` parameter of the `ApiRoute` function.

For example, we have a `validateInput` middleware which validates the body or path parameters of the request. It uses the node-input-validator library to perform validation. If the validation fails, the middleware returns a 400 response with the validation errors.

Here is an example of how to use it:

```javascript
export const getTenantById = ApiRoute(async (event) => {
  const parameters = {
    id: event.pathParameters.id
  };

  return await getTenantEx(parameters);
}, {
  middlewares: [validateInput({
    type: "path",
    validationSchema: schemaByIdValidator
  })]
});
```

In this example, the `validateInput` middleware is used to validate the `id` path parameter. The validation schema is specified in `schemaByIdValidator`.

## Conclusion

Middlewares provide a powerful way to reuse common code across functions. They also help to keep your functions clean and focused on their primary task. By using the middy library, we can easily add and manage middlewares in our serverless functions.