require! {
    \../blockstarter.js
}

{ contributors } = blockstarter

describe \Admin , !(_)->
   storage =
      api-key: 'TEST-APIKEY'

   

   #  User is to load campaign information
   it \contributors, (done) !->
   
      throw "API Key is required" if not storage.api-key?
      
      project = \KickCity
      
      err, list <-! contributors { storage.api-key, project }
      
      throw err if err?
   
      done!