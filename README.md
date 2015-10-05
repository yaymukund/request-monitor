# Impact Monitor

A simple client for monitoring your requests, built in Ember. Here are the
configuration options with their default values:

```js
ENV = {
  serverURL: 'http://impact-server.herokuapp.com/impacts',
  dataURL: 'https://s3.amazonaws.com/public-music/data.csv',
  dataPreviewURL: 'https://s3.amazonaws.com/public-music/data.preview.csv'
};
```

The server is any URL that accepts `offset` and `limit` url params, and
responds with an array of requests.

```json
> GET /impacts?offset=5&limit=10
=> [
  [5,"patch","http://example.com/path/50",4142139,6504215,3848435],
  [6,"put","http://example.com/path/51",798655,3165923,5029839],
  [7,"options","http://example.com/path/52",4370254,481938,6157220],
  [8,"patch","http://example.com/path/53",6963838,5411225,9930909],
  [9,"delete","http://example.com/path/54",804587,1888125,5716086]
]
```

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

