// Generated by LiveScript 1.5.0
(function(){
  var superagent, url, check, required, sidBased, support, address, auth, changePassword, updateProfile, contributors, forgotPassword, resetPassword, panel, helpMe, out$ = typeof exports != 'undefined' && exports || this;
  superagent = require('superagent');
  url = function(root, part){
    return root + "/" + part;
  };
  check = curry$(function(o, key){
    if (o[key] == null) {
      throw "Required argument '" + key + "' is not passed. Please check the documentation.";
    }
  });
  required = function(o){
    return Object.keys(o).forEach(check(o));
  };
  sidBased = curry$(function(part, storage, cb){
    var sessionId, apiKey, baseUrl, isBrowser, ref$, method, urlPart, fullurl;
    sessionId = storage.sessionId, apiKey = storage.apiKey, baseUrl = storage.baseUrl, isBrowser = storage.isBrowser;
    if (sidBased.loading === true && isBrowser) {
      return cb("Already in process");
    }
    sidBased.loading = true;
    ref$ = part.split(' '), method = ref$[0], urlPart = ref$[1];
    required({
      sessionId: sessionId,
      apiKey: apiKey,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, urlPart);
    return superagent[method](fullurl).set('sid', sessionId).set('api-key', apiKey).end(function(err, resp){
      delete sidBased.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  });
  support = ['btc', 'ltc', 'dash', 'doge', 'eth', 'waves', 'zec'];
  out$.address = address = function(arg$, cb){
    var sessionId, dashboard, type, apiKey, isBrowser, baseUrl, address;
    sessionId = arg$.sessionId, dashboard = arg$.dashboard, type = arg$.type, apiKey = arg$.apiKey, isBrowser = arg$.isBrowser, baseUrl = arg$.baseUrl;
    required({
      sessionId: sessionId,
      type: type,
      apiKey: apiKey,
      baseUrl: baseUrl
    });
    if (support.indexOf(type.toLowerCase()) === -1) {
      throw "Support only " + support;
    }
    if (dashboard != null) {
      address = dashboard.user.profile[type + "-address"];
      if (address) {
        return cb(null, address);
      }
    }
    return sidBased("get new-address/" + type, {
      sessionId: sessionId,
      apiKey: apiKey,
      isBrowser: isBrowser,
      baseUrl: baseUrl
    }, function(err, resp){
      if (err != null) {
        return cb(err);
      }
      if (dashboard != null) {
        dashboard.user.profile[type + "-address"] = resp.address;
      }
      cb(null, resp.address);
    });
  };
  out$.auth = auth = function(form, cb){
    var baseUrl, isBrowser, fullurl;
    baseUrl = form.baseUrl, isBrowser = form.isBrowser;
    if (auth.loading === true && isBrowser) {
      return cb("Already in process");
    }
    auth.loading = true;
    required({
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, 'crowdsale/start');
    return superagent.post(fullurl).send(form).end(function(err, resp){
      delete auth.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.changePassword = changePassword = function(storage, cb){
    var apiKey, sessionId, newPassword, oldPassword, transport, baseUrl, isBrowser, fullurl;
    apiKey = storage.apiKey, sessionId = storage.sessionId, newPassword = storage.newPassword, oldPassword = storage.oldPassword, transport = storage.transport, baseUrl = storage.baseUrl, isBrowser = storage.isBrowser;
    if (changePassword.loading === true && isBrowser) {
      return cb("Already in process");
    }
    changePassword.loading = true;
    required({
      apiKey: apiKey,
      sessionId: sessionId,
      newPassword: newPassword,
      oldPassword: oldPassword,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, 'change-password');
    return superagent.post(fullurl).send({
      newPassword: newPassword,
      oldPassword: oldPassword,
      transport: transport
    }).set('api-key', apiKey).set('sid', sessionId).end(function(err, resp){
      delete changePassword.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.updateProfile = updateProfile = function(storage, cb){
    var apiKey, sessionId, newPassword, oldPassword, username, email, address, transport, baseUrl, isBrowser, fullurl;
    apiKey = storage.apiKey, sessionId = storage.sessionId, newPassword = storage.newPassword, oldPassword = storage.oldPassword, username = storage.username, email = storage.email, address = storage.address, transport = storage.transport, baseUrl = storage.baseUrl, isBrowser = storage.isBrowser;
    if (updateProfile.loading === true && isBrowser) {
      return cb("Already in process");
    }
    updateProfile.loading = true;
    required({
      apiKey: apiKey,
      sessionId: sessionId,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, 'update-profile');
    return superagent.post(fullurl).send({
      newPassword: newPassword,
      oldPassword: oldPassword,
      username: username,
      email: email,
      address: address,
      transport: transport
    }).set('api-key', apiKey).set('sid', sessionId).end(function(err, resp){
      delete updateProfile.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.contributors = contributors = function(storage, cb){
    var apiKey, project, baseUrl, isBrowser, fullurl;
    apiKey = storage.apiKey, project = storage.project, baseUrl = storage.baseUrl, isBrowser = storage.isBrowser;
    if (contributors.loading === true && isBrowser) {
      return cb("Already in process");
    }
    contributors.loading = true;
    required({
      apiKey: apiKey,
      project: project,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, "campaign/" + project + "/contributors");
    return superagent.get(fullurl).set('api-key', apiKey).end(function(err, resp){
      delete contributors.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.forgotPassword = forgotPassword = function(arg$, cb){
    var returnUrl, transport, apiKey, email, project, baseUrl, isBrowser, fullurl;
    returnUrl = arg$.returnUrl, transport = arg$.transport, apiKey = arg$.apiKey, email = arg$.email, project = arg$.project, baseUrl = arg$.baseUrl, isBrowser = arg$.isBrowser;
    if (forgotPassword.loading === true && isBrowser) {
      return cb("Already in process");
    }
    forgotPassword.loading = true;
    required({
      returnUrl: returnUrl,
      apiKey: apiKey,
      email: email,
      project: project,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, 'forgot-password');
    return superagent.post(fullurl).send({
      returnUrl: returnUrl,
      transport: transport,
      email: email,
      project: project
    }).set('api-key', apiKey).end(function(err, resp){
      delete forgotPassword.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.resetPassword = resetPassword = function(arg$, cb){
    var restoreKey, newPassword, transport, apiKey, baseUrl, isBrowser, fullurl;
    restoreKey = arg$.restoreKey, newPassword = arg$.newPassword, transport = arg$.transport, apiKey = arg$.apiKey, baseUrl = arg$.baseUrl, isBrowser = arg$.isBrowser;
    if (resetPassword.loading === true && isBrowser) {
      return cb("Already in process");
    }
    resetPassword.loading = true;
    required({
      restoreKey: restoreKey,
      apiKey: apiKey,
      newPassword: newPassword,
      baseUrl: baseUrl
    });
    fullurl = url(baseUrl, 'reset-password');
    return superagent.post(fullurl).send({
      restoreKey: restoreKey,
      newPassword: newPassword,
      transport: transport
    }).set('api-key', apiKey).end(function(err, resp){
      delete resetPassword.loading;
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.panel = panel = sidBased('get contribution-panel');
  out$.helpMe = helpMe = sidBased('post help-me');
  function curry$(f, bound){
    var context,
    _curry = function(args) {
      return f.length > 1 ? function(){
        var params = args ? args.concat() : [];
        context = bound ? context || this : this;
        return params.push.apply(params, arguments) <
            f.length && arguments.length ?
          _curry.call(context, params) : f.apply(context, params);
      } : f;
    };
    return _curry();
  }
}).call(this);
