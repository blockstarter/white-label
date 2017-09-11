# Blockstarter White Label API

This is library helps to integrate blockstarter with client's dashboard

![Image](http://res.cloudinary.com/nixar-work/image/upload/v1505169189/21267790_1639557839387601_1827861287_o.png)

## Install 

```
npm i blockstarter-wl
```

## Usage

First of all define a storage

```Javascript

var storage = {
    sessionId: null,
    apiKey: 'TEST-APIKEY',
    dashboard: null
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

Information about Totals, Rates, Currencies, etc. in order to build a main screen where contributor can 

1. get address to send money
2. check his transactions
3. check common information about project
4. get total raised (progress)

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

var request =  Object.assign({}, storage, { type: 'ltc' });

blockstarter.address(request, function(err, addressInfo){
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

blockstarter.helpMe(storage, function(err, info){
  if (err != null) {
    throw err;
  }
  console.log('done')
});

```