
# @rowanmanning/not-found

Create Express middleware which results in an HTTP 404 Not Found error.


## Table of Contents

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 10+


## Usage

Install with [npm](https://www.npmjs.com/):

```sh
npm install @rowanmanning/not-found
```

Load the library into your code with a `require` call:

```js
const notFound = require('@rowanmanning/not-found');
```

Create middleware which results in an HTTP 404 error in [Express](https://expressjs.com):

```js
const express = require('express');
const notFound = require('@rowanmanning/not-found');

const app = express();

app.use(notFound());
```

Handle the 404 error like you would any other error in Express:

```js
app.use((error, request, response, next) => {
    response.status(error.status); // 404
    response.send(error.message); // Not Found
});
```

Customise the error message with an option:

```js
app.use(notFound({
    message: 'This page does not exist'
}));

app.use((error, request, response, next) => {
    response.status(error.status); // 404
    response.send(error.message); // This page does not exist
});
```


## Contributing

To contribute to this library, clone this repo locally and commit your code on a separate branch. Please write unit tests for your code, and run the linter before opening a pull-request:

```sh
make test    # run all tests
make verify  # run all linters
```


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2019, Rowan Manning
