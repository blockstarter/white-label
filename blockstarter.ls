require! {
    \superagent
}

url = -> "http://root.flyber.net/#{it}"

check = (o, key)-->
    throw "Required argument '#key' is not passed. Please check the documentation." if not o[key]?
    
required = (o)->
    Object.keys(o).for-each check(o)

sid-based = (part, storage, cb)-->
   return cb "Already in process" if sid-based.loading is yes
   sid-based.loading = yes
   { session-id, api-key } = storage
   [method, url-part] = part.split(' ')
   required { session-id, api-key }
   fullurl = url url-part
   err, resp <-! superagent[method](fullurl).set(\sid, session-id).set(\api-key, api-key).end
   delete sid-based.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

support = <[ btc ltc dash doge eth waves zec ]>

export address = ({ session-id, dashboard, type, api-key }, cb)->
    return cb "Already in process" if address.loading is yes
    address.loading = yes
    required { session-id, dashboard, type, api-key }
    throw "Support only #{support}" if support.index-of(type.to-lower-case!) is -1
    address = dashboard.user.profile["#{type}-address"]
    return cb null, address if address
    err, resp <-! sid-based "get new-address/#type", { session-id, api-key }
    delete address.loading
    return cb err if err?
    dashboard.user.profile["#{type}-address"] = resp.address
    cb null, resp.address

export auth = (form, cb)->
   return cb "Already in process" if auth.loading is yes
   auth.loading = yes
   required { form }
   fullurl = url \crowdsale/start
   err, resp <-! superagent.post fullurl .send form .end
   delete auth.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

export contributors = (storage, cb)->
   return cb "Already in process" if contributors.loading is yes
   contributors.loading = yes
   { api-key, project } = storage
   required { api-key, project }
   fullurl = url("campaign/#{project}/contributors")
   err, resp <-! superagent.get(fullurl).set(\api-key, api-key).end
   delete contributors.loading
   return cb err if err?
   cb null, JSON.parse(resp.text)

export panel = sid-based 'get contribution-panel'

export help-me = sid-based 'post help-me'
    
  
    