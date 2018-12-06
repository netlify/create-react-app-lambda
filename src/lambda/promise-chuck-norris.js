// example to have the handler return a promise directly
// https://aws.amazon.com/blogs/compute/node-js-8-10-runtime-now-available-in-aws-lambda/

import fetch from 'node-fetch';
export async function handler(event, context) {
  return new Promise((resolve, reject) => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
      if (response.ok) { // response.status >= 200 && response.status < 300
        return response.json();
      } else {
        resolve({ statusCode: response.status, body: response.statusText })
      };
    })
    .then(data =>{
      const response = {
        statusCode: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ msg: data.value })
      }
      resolve(response);
    })
    .catch(err => {
      console.log(err)
      resolve({ statusCode: 500, body: err.message });
    })
  });
}
