// show object spread works, i.e. babel works
const obj = {
  foo: 'bar'
};
export function handler(event, context, callback) {
  console.log('qsp', event.queryStringParameters);
  console.log('**********');
  console.log('mvsp', event.multiValueQueryStringParameters);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Hello, World!', ...obj })
  });
}
