require! {
    \superagent
}


url = (root, part)-> 
   "#{root}/#{part}"

check = (o, key)-->
    throw "Required argument '#key' is not passed. Please check the documentation." if not o[key]?
    
required = (o)->
    Object.keys(o).for-each check(o)

sid-based = (part, storage, cb)-->
   { session-id, api-key, base-url, is-browser } = storage
   return cb "Already in process" if sid-based.loading is yes and is-browser
   sid-based.loading = yes
   [method, url-part] = part.split(' ')
   required { session-id, api-key, base-url }
   fullurl = url base-url, url-part
   err, resp <-! superagent[method](fullurl).set(\sid, session-id).set(\api-key, api-key).end
   delete sid-based.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

support = <[ btc ltc dash doge eth waves zec ]>

export address = ({ session-id, dashboard, type, api-key, is-browser, base-url }, cb)->
    required { session-id, type, api-key, base-url }
    throw "Support only #{support}" if support.index-of(type.to-lower-case!) is -1
    if dashboard?
       address = dashboard.user.profile["#{type}-address"]
       return cb null, address if address
    
    fullurl = url base-url, \address
    err, resp <-! superagent.post(fullurl).send({ type }).set(\api-key, api-key).set(\sid, session-id).end
    return cb err if err?
    data = JSON.parse(resp.text)
    if dashboard?
       dashboard.user.profile["#{type}-address"] = data.address
    cb null, data.address

export auth = (form, cb)->
   { base-url, email, password, confirm-url, is-browser, api-key, ip } = form
   return cb "Already in process" if auth.loading is yes and is-browser
   auth.loading = yes
   required { base-url, email, password, confirm-url, api-key }
   fullurl = url base-url, \auth
   err, resp <-! superagent
      .post fullurl 
      .set \api-key, api-key
      .set \x-ip, ip
      .send form .end
   delete auth.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)
   
export logout = (form, cb)->
   { session-id, is-browser } = form
   return cb "Already in process" if logout.loading is yes and is-browser
   logout.loading = yes
   required { session-id }
   fullurl = url base-url, \logout
   err, resp <-! superagent.post fullurl .send form .end
   delete logout.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)
   
export confirm-email = (storage, cb)->
   { api-key, session-id, confirmation-id, transport, base-url, is-browser } = storage
   return cb "Already in process" if confirm-email.loading is yes and is-browser
   confirm-email.loading = yes
   required { api-key, session-id, confirmation-id, base-url }
   fullurl = url base-url, \confirm-email
   err, resp <-! superagent.post(fullurl).send({ confirmation-id, transport }).set(\api-key, api-key).set(\sid, session-id).end
   delete confirm-email.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)
    

export change-password = (storage, cb)->
   { api-key, session-id, new-password, old-password, transport, base-url, is-browser } = storage
   return cb "Already in process" if change-password.loading is yes and is-browser
   change-password.loading = yes
   required { api-key, session-id, new-password, old-password, base-url }
   fullurl = url base-url, \change-password
   err, resp <-! superagent.post(fullurl).send({ new-password, old-password, transport }).set(\api-key, api-key).set(\sid, session-id).end
   delete change-password.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)
   
export update-profile = (storage, cb)->
   { api-key, session-id, new-password, old-password, username, email, address, transport, base-url, is-browser } = storage
   return cb "Already in process" if update-profile.loading is yes and is-browser
   update-profile.loading = yes
   required { api-key, session-id, base-url }
   fullurl = url base-url, \update-profile
   err, resp <-! superagent.post(fullurl).send({ new-password, old-password, username, email, address, transport }).set(\api-key, api-key).set(\sid, session-id).end
   delete update-profile.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)


export contributors = (storage, cb)->
   { api-key, project, base-url, is-browser } = storage
   return cb "Please do not call it from browser" if is-browser
   return cb "Already in process" if contributors.loading is yes and is-browser
   contributors.loading = yes
   required { api-key, project, base-url }
   fullurl = url(base-url, "campaign/#{project}/contributors")
   err, resp <-! superagent.get(fullurl).set(\api-key, api-key).end
   delete contributors.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

export resend-confirm-email = (storage, cb)->
   { api-key, session-id, transport, base-url, is-browser, confirm-url } = storage
   return cb "Already in process" if resend-confirm-email.loading is yes and is-browser
   resend-confirm-email.loading = yes
   required { api-key, session-id, base-url, confirm-url }
   fullurl = url base-url, \resend-confirm-email
   err, resp <-! superagent.post(fullurl).send({ transport, confirm-url }).set(\api-key, api-key).set(\sid, session-id).end
   delete resend-confirm-email.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

export forgot-password = ({ return-url, transport, api-key, email, project, base-url, is-browser }, cb)->
   return cb "Already in process" if forgot-password.loading is yes and is-browser
   forgot-password.loading = yes
   required { return-url, api-key, email, project, base-url }
   fullurl = url base-url, \forgot-password
   err, resp <-! superagent.post fullurl .send { return-url, transport, email, project } .set(\api-key, api-key) .end
   delete forgot-password.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

#{ storage.api-key, storage.restore-key, transport, new-password }
export reset-password = ({ restore-key, new-password, transport, api-key, base-url, is-browser, project }, cb)->
   return cb "Already in process" if reset-password.loading is yes and is-browser
   reset-password.loading = yes
   required { restore-key, api-key, new-password, base-url }
   fullurl = url base-url, \reset-password
   err, resp <-! superagent.post fullurl .send { restore-key, new-password, transport, project } .set(\api-key, api-key)  .end
   delete reset-password.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

export panel = sid-based 'post panel'

export help-me = sid-based 'post help-me'
    
  
    