let _headers = {};
let _params = '';
let _responseText = '';
let _status = 0;

global.window = global;
global.XMLHttpRequest = class XMLHttpRequest {
  constructor() {
    this._readyState = 0;
  }
  get readyState() {
    this._readyState = Math.min(4, this._readyState + 1);
    return this._readyState;
  }
  get responseText() {
    return _responseText;
  }
  get status() {
    return _status;
  }
  addEventListener(name, callback) {
    this['on' + name] = callback;
  }
  open(method, target, asynchronous) {
    assert(method === 'POST', 'unexpected method');
    assert(target === '/api/paperboy', 'unexpected target');
    assert(asynchronous, 'unexpected synchronous request');
    this._readyState = 1;
  }
  send(params) {
    _params = params;
    this.onreadystatechange();
    setTimeout(() => this.onreadystatechange(), 10);
    setTimeout(() => this.onreadystatechange(), 20);
  }
  setRequestHeader(key, value) {
    _headers[key] = value;
  }
};

const {default: StaticEmail} = require('../cjs');
StaticEmail()
  .then(() => assert(false, 'no details should fail'))
  .catch(Object);

StaticEmail({})
  .then(() => assert(false, 'empty details should fail'))
  .catch(Object);

StaticEmail({path: '/api/paperboy'})
  .then(() => assert(false, 'only token should fail'))
  .catch(Object);

_status = 200;
StaticEmail({path: '/api/paperboy', text: 'Hello World!'})
  .then(() => {
    _status = 0;
    assert(_params === 'text=Hello%20World!', 'unexpected params');
    assert(JSON.stringify(_headers) === '{"Content-Type":"application/x-www-form-urlencoded"}', 'unexpected headers');
    StaticEmail({path: '/api/paperboy', text: 'Hello World!'})
      .then(() => exit(new Error('unexpected execution')))
      .catch(err => {
        assert(err.message === 'Not Found', 'unexpected error message');
        _responseText = 'shenanigans';
        StaticEmail({path: '/api/paperboy', text: 'Hello World!'})
          .then(() => exit(new Error('unexpected execution')))
          .catch(err => {
            assert(err.message === 'shenanigans', 'unexpected error message');
          })
      })
  })
  .catch(exit);

function assert(value, message) {
  console.assert(value, message);
  if (!value)
    exit(new Error('assertion failed'));
}

function exit(err) {
  console.error(err);
  process.exit(1);
}
