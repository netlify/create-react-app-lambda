This project is based on [Create React App](https://github.com/facebookincubator/create-react-app).

You can follow the docs there to see the full docs on Create React App.

The main addition is a new folder: `src/lambda`. Each js file in there will automatically be deployed and routed as an AWS lambda function by Netlify's continuous deployments.

As an example, we've included a small `src/lambda/hello.js` function, which will be deployed to `/.netlify/functions/hello`.

Each function must export a `handler( event, context, callback )` (eaxtly as if the Lambda had been configured with AWS's API Gateway).

The event object looks like:

```js
{
    "path": "/.netlify/functions/hello",
    "httpMethod": "GET"
    "headers": {...}
    "queryStringParameters": {...}
    "body": "Request Body"
    "isBase64Encoded": "A boolean flag to indicate if the applicable request payload is Base64-encode"
}
```

our handler should use the callback to return either an error (as the first parameter) or a response object:

```js
{
    "isBase64Encoded": true|false,
    "statusCode": httpStatusCode,
    "headers": { "headerName": "headerValue", ... },
    "body": "..."
}
```

Here’s a simple example function `hello.js`:

```js
exports.handler = function(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
}
```

## Babel/Webpack compilation

All functions are compiled with webpack using the Babel Loader, so you can use modern JS, import npm modules, etc, without any extra setup.

## Local Development

Before developing, clone the repository and run `yarn` from the root of the repo.

Then open one terminal tab and run:

```
yarn start
```

This will start the normal create-react-app dev server and open your app at `http://localhost:3000`

Then open a separate terminal tab and run:

```
yarn start:lambda
```

This will open a local server running at `http://localhost:9000` serving your lambda functions.

Requests to `http://localhost:3000/.netlify/functions/*` will automatically be proxied to the lambda dev server.