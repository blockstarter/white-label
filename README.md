# Blockstarter White Label API (Blockstarter Enterprise)

This is library helps to integrate blockstarter with client's dashboard

![Image](http://res.cloudinary.com/nixar-work/image/upload/v1505169189/21267790_1639557839387601_1827861287_o.png)

## Install 

```
npm i blockstarter-wl
```

## Available functions 

* auth
* confirmEmail
* forgotPassword
* resetPassword
* changePassword
* updateProfile
* panel
* address
* contributors

## Usage

First of all define a storage

```Javascript

var storage = {
    isBrowser: true,  //=> you cannot duplicate requests for browser
    baseUrl: "http://server.url",
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
  isBrowser: storage.isBrowser,
  baseUrl: storage.baseUrl,
  email: 'test@test.com',
  password: 'unique password',
  confirmUrl: "http://redirect-on-confirm" // will redirect here http://redirect-on-confirm?confirmation-id=XXXXX
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

#### Confirm Email

Send `confirmation-id` and `session-id` to confirm email

`Documentation is not ready`



####  Forgot password

```Javascript

if (storage.apiKey == null) {
      throw "API Key is required";
}

var request = {
    isBrowser: storage.isBrowser,
    baseUrl: storage.baseUrl,
    apiKey: storage.apiKey,
    email: "your@email.com",
    project: "KickCity",
    transport: "postmaster@test.mailgun.org",
    returnUrl: "http://restore-password.com" //server will invoke http://restore-password.com?restore-key=SOME_RANDON_KEY
}
    
blockstarter.forgotPassword(request, function(err, dashboard){
  if (err != null) {
    throw err;
  }
  
  console.log("done");
});
```  

####  Reset password

User obtains email message with `restore password link` and then user fills the form. 
You should obtain `restore-key` from query params and send it to the server

```Javascript
  

if (storage.apiKey == null) {
      throw "API Key is required";
}

var request = { 
    isBrowser: storage.isBrowser,
    baseUrl: storage.baseUrl,
    apiKey: storage.apiKey,
    newPassword: "newPassword",
    transport: "postmaster@test.mailgun.org",
    restoreKey: "Obtain restore key from ?restore-key=SOME_RANDON_KEY"
}
    
blockstarter.resetPassword(request, function(err, dashboard){
  if (err != null) {
    throw err;
  }
  
  console.log("done");
});
```  

####  Change password

Change password when session is created and user is online

```Javascript
  
if (storage.apiKey == null) {
      throw "API Key is required";
}

if (storage.sessionId == null) {
      throw "Session is required";
}

var request = {
    isBrowser: storage.isBrowser,
    baseUrl: storage.baseUrl,
    apiKey: storage.apiKey,
    sessionId: storage.sessionId,
    newPassword: "newPassword",
    oldPassword: "oldPassword",
    transport: "postmaster@test.mailgun.org"
}
    
blockstarter.changePassword(request, function(err, dashboard){
  if (err != null) {
    throw err;
  }
  
  console.log("done");
});
```  

#### Update Profile 

Almost like changePassword but can update `email`, `username`, `address` optionaly

`Documentation is not ready`

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

var request = {
   isBrowser: storage.isBrowser,
   baseUrl: storage.baseUrl,
   apiKey: storage.apiKey,
   sessionId: storage.sessionId,
   dashboard: storage.dashboard,
   type: 'ltc'
}   

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

####  List of contributors

Get list of contributors for administrator

```Javascript

if (storage.apiKey == null) {
  throw "API Key is required";
}

var request = { 
   isBrowser: storage.isBrowser,
   baseUrl: storage.baseUrl,
   apiKey: storage.apiKey,  
   project: "KickCity"
}

blockstarter.contributors(request, function(err, list){
  if (err != null) {
    throw err;
  }
  console.log(list)
});

```