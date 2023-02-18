// this uses the callback syntax, however, we encourage you to try the async/await syntax shown in async-dadjoke.js
export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  let x = (Math.random(1,100) *100);
  myMsg = 'Hello World, Your number is ' + x;
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: myMsg }),
  })
}
