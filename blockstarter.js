// Generated by LiveScript 1.5.0
(function(){
  var superagent, url, check, required, sidBased, support, address, auth, contributors, panel, helpMe, out$ = typeof exports != 'undefined' && exports || this;
  superagent = require('superagent');
  url = function(it){
    return "http://root.flyber.net/" + it;
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
    var sessionId, apiKey, ref$, method, urlPart, fullurl;
    sessionId = storage.sessionId, apiKey = storage.apiKey;
    ref$ = part.split(' '), method = ref$[0], urlPart = ref$[1];
    required({
      sessionId: sessionId,
      apiKey: apiKey
    });
    fullurl = url(urlPart);
    return superagent[method](fullurl).set('sid', sessionId).set('api-key', apiKey).end(function(err, resp){
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  });
  support = ['btc', 'ltc', 'dash', 'doge', 'eth', 'waves', 'zec'];
  out$.address = address = function(arg$, cb){
    var sessionId, dashboard, type, apiKey, address;
    sessionId = arg$.sessionId, dashboard = arg$.dashboard, type = arg$.type, apiKey = arg$.apiKey;
    required({
      sessionId: sessionId,
      dashboard: dashboard,
      type: type,
      apiKey: apiKey
    });
    if (support.indexOf(type.toLowerCase()) === -1) {
      throw "Support only " + support;
    }
    address = dashboard.user.profile[type + "-address"];
    if (address) {
      return cb(null, address);
    }
    return sidBased("get new-address/" + type, {
      sessionId: sessionId,
      apiKey: apiKey
    }, function(err, resp){
      if (err != null) {
        return cb(err);
      }
      dashboard.user.profile[type + "-address"] = resp.address;
      cb(null, resp.address);
    });
  };
  out$.auth = auth = function(form, cb){
    var fullurl;
    required({
      form: form
    });
    fullurl = url('crowdsale/start');
    return superagent.post(fullurl).send(form).end(function(err, resp){
      if (err != null) {
        return cb(err);
      }
      cb(null, JSON.parse(resp.text));
    });
  };
  out$.contributors = contributors = function(storage, cb){
    var apiKey, project, fullurl;
    apiKey = storage.apiKey, project = storage.project;
    required({
      apiKey: apiKey,
      project: project
    });
    fullurl = url("campaign/" + project + "/contributors");
    return superagent.get(fullurl).set('api-key', apiKey).end(function(err, resp){
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
