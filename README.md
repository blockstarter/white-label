# Blockstarter White Label API

This is library helps to integrate blockstarter with client's dashboard


## Install 

```
npm i blockstarter-wl
```

## Usage

First of all define a storage

```Javascript

var storage = {
    sessionId: null,
    apiKey: 'TEST-APIKEY'
  };

```

### Auth

Login or Register

```Javascript

var blockstarter = require('blockstarter-wl');

if (storage.apiKey == null) {
  throw "API Key is required";
}

blockstarter.auth({
  email: 'test@test.com',
  password: 'unique password',
  project: 'KickCity',
  reference: 'traffic-source',
  apiKey: storage.apiKey
}, function(err, session){
      if (err != null) {
        throw err;
      }
      if (session.sessionId == null) {
        throw "Session ID is missing";
      }
      storage.sessionId = session.sessionId;
      console.log(session.sessionId);
});

```

####  Get Dashboard

Information about Totals, Rates, Currencies, etc.

```Javascript
  
if (storage.sessionId == null) {
      throw "Session is required";
}

if (storage.apiKey == null) {
      throw "API Key is required";
}
    
blockstarter.panel(storage, function(err, dashboard){
  if (err != null) {
    throw err;
  }
  storage.dashboard = dashboard;
  console.log(dashboard);
});
```  

####  Get Address

Get [btc, ltc, eth, waves, dash, zec] address
  

```Javascript

if (storage.sessionId == null) {
  throw "Session is required";
}
if (storage.apiKey == null) {
  throw "API Key is required";
}
if (storage.dashboard == null) {
  throw "Dashboard is required";
}

var type = 'ltc';

var request = (storage.type = type, storage);

address(request, function(err, addressInfo){
  if (err != null) {
    throw err;
  }
  console.log(addressInfo);
});

```

####  Ask for help

User can ask for help and admin will contact him by email

```Javascript

if (storage.sessionId == null) {
  throw "Session is required";
}
if (storage.apiKey == null) {
  throw "API Key is required";
}
helpMe(storage, function(err, info){
  if (err != null) {
    throw err;
  }
  console.log('done')
});

```