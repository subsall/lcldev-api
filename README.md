 **lcldev-api**
communication with lcldev api
##
index.js example

    const lcldev = require("lcldev-api")
    
    lcldev.on("message",function(message,channel) {
        console.log(message.Content)
        channel.Send("Message recieved!")
    })
    
    lcldev.login("bot token")

# Documentation
There is currently no documentation available.