// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

import fetch from 'node-fetch';
export async function handler(event, context) {
  if (!context.clientContext && !context.clientContext.identity) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        msg:
          'No identity instance detected. Did you enable it? Also, Netlify Identity is not supported on local dev yet.'
      }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
  const { identity, user } = context.clientContext;
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random');
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ identity, user, msg: data.value })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
