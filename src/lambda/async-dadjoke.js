// example of async handler using async-await
// https://github.com/netlify/netlify-lambda/issues/43#issuecomment-444618311

const axios = require("axios");
exports.handler = async (event) => {
  try {
    console.log("asdf");
    // YOU HAVE TO USE "User-Agent"
    // see https://stackoverflow.com/questions/68678930/why-making-a-get-request-with-axios-failing-with-status-code-503
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1",
      },
    });
    const data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    };
  } catch (err) {
    // console.error(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }), // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
