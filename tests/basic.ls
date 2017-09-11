require! {
    \../blockstarter.js
}

{ auth, panel, help-me, address } = blockstarter

describe \Basic , !(_)->
   storage =
      session-id: null
      api-key: 'TEST-APIKEY'

   # User is able to login
   it \auth, (done) !->
      
      throw "API Key is required" if not storage.api-key?
      
      #fill all required fields
      email = \test@test.com
      password = 'unique password'
      project = \KickCity
      reference = \traffic-source
      
      # send request to the server
      err, session <-! auth {  email , password , project , reference, storage.api-key }
      
      throw err if err?
      throw "Session ID is missing" if not session.session-id?
      
      storage.session-id = session.session-id
      
      done!

   #  User is to load campaign information
   it \get-dashboard, (done) !->
      
      throw "Session is required" if not storage.session-id?
      throw "API Key is required" if not storage.api-key?
      
      err, dashboard <-! panel storage
      
      throw err if err?
      
      storage.dashboard = dashboard
      done!

   # User able to ask address for contribution
   
   it \address , (done) !->
      @timeout(5000) # it can take time, so please use spinner on client side
      throw "Session is required" if not storage.session-id?
      throw "API Key is required" if not storage.api-key?
      throw "Dashboard is required" if not storage.dashboard?
      
      type = \ltc
      
      request = storage <<< { type }
      
      err, address-info <-! address request
      
      throw err if err?
      done!

   # User is able to click `help-me` button. UI should should the alert message 'Admin is informed and will contact you by mail'
   
   it \help-me, (done) !->
      
      throw "Session is required" if not storage.session-id?
      throw "API Key is required" if not storage.api-key?
      
      err, info <-! help-me storage
      
      throw err if err?
      done!