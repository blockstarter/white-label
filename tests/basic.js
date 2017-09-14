// Generated by LiveScript 1.5.0
(function(){
  var blockstarter, auth, panel, helpMe, address, resetPassword, forgotPassword;
  blockstarter = require('../blockstarter.js');
  auth = blockstarter.auth, panel = blockstarter.panel, helpMe = blockstarter.helpMe, address = blockstarter.address, resetPassword = blockstarter.resetPassword, forgotPassword = blockstarter.forgotPassword;
  describe('Basic', function(_){
    var storage;
    storage = {
      sessionId: null,
      apiKey: 'TEST-APIKEY'
    };
    it('auth', function(done){
      var email, password, project, reference;
      if (storage.apiKey == null) {
        throw "API Key is required";
      }
      email = 'test@test.com';
      password = 'unique password';
      project = 'KickCity';
      reference = 'traffic-source';
      auth({
        email: email,
        password: password,
        project: project,
        reference: reference,
        apiKey: storage.apiKey
      }, function(err, session){
        if (err != null) {
          throw err;
        }
        if (session.sessionId == null) {
          throw "Session ID is missing";
        }
        storage.sessionId = session.sessionId;
        done();
      });
    });
    it('forgot-password', function(done){
      var returnUrl, transport, email, project, request;
      if (storage.apiKey == null) {
        throw "API Key is required";
      }
      returnUrl = "http://restore-password.com";
      transport = "postmaster@test.mailgun.org";
      email = "your@email.com";
      project = "KickCity";
      request = {
        apiKey: storage.apiKey,
        returnUrl: returnUrl,
        transport: transport,
        email: email,
        project: project
      };
      forgotPassword(request, function(err, resp){
        storage.restoreKey = "OBTAIN RESTORE KEY FROM EMAIL";
        storage.restoreKey = resp.restoreKey;
        if (err != null) {
          throw err;
        }
        done();
      });
    });
    it('reset-password', function(done){
      var transport, newPassword, request;
      if (storage.apiKey == null) {
        throw "API Key is required";
      }
      if (storage.restoreKey == null) {
        throw "Restore Key is required";
      }
      transport = "postmaster@test.mailgun.org";
      newPassword = "NEWPASSWORD";
      request = {
        apiKey: storage.apiKey,
        restoreKey: storage.restoreKey,
        transport: transport,
        newPassword: newPassword
      };
      resetPassword(request, function(err){
        delete storage.restoreKey;
        if (err != null) {
          throw err;
        }
        done();
      });
    });
    it('get-dashboard', function(done){
      if (storage.sessionId == null) {
        throw "Session is required";
      }
      if (storage.apiKey == null) {
        throw "API Key is required";
      }
      panel(storage, function(err, dashboard){
        if (err != null) {
          throw err;
        }
        storage.dashboard = dashboard;
        done();
      });
    });
    it('address', function(done){
      var type, request;
      this.timeout(5000);
      if (storage.sessionId == null) {
        throw "Session is required";
      }
      if (storage.apiKey == null) {
        throw "API Key is required";
      }
      if (storage.dashboard == null) {
        throw "Dashboard is required";
      }
      type = 'ltc';
      request = (storage.type = type, storage);
      address(request, function(err, addressInfo){
        if (err != null) {
          throw err;
        }
        done();
      });
    });
    it('help-me', function(done){
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
        done();
      });
    });
  });
}).call(this);
