// Created by lcldev.net
// Interaction with lcldev API

var token = ""
const axios = require('axios');
const FormData = require('form-data');

function sendMessage(text,chan) {
    const formData = new FormData();
    formData.append('sendmsg', text);
    var headers = formData.getHeaders()
    headers["Cookie"] = "usertok="+token+";"
    
    axios.request({
         url: 'https://lcldev.net/v2/chat/send.php?channel='+chan,
         method: "post",
         data: formData,
         headers: headers
    }).then(resp => {
        return 200;
    });
}

function newChannelStruct(CH) {
    return {
        Name: CH,
        Send: (msg)=> {
            sendMessage(msg,CH)
        }
    }
}

function changeDisplayName(text) {
    headers = {
        Cookie: "usertok="+token+";"
    }
    
    axios.request({
         url: "https://lcldev.net/api/changeDisplayName.php?newds="+text,
         method: "get",
         headers: headers
    }).then(resp => {
        return 200;
    });
}

async function start() {
    // await changeDisplayName("System")
    // await sendMessage("i cant read messages","Chat 1")
    // var lastData = ""
    // headers = {
    //     Cookie: "usertok="+token+";"
    // }
    // setInterval(() => {
    //     axios.get("https://lcldev.net/chatAPI.php?channel=Chat%201",{headers: headers}).then(async (data) => {
    //         if(lastData!=data.data) {
    //             const {parse} = require('node-html-parser');
    //             console.log(parse(data.data));
    //             // console.log("Message detected")
    //             // await sendMessage("MessageDetected","Chat 1")
    //             // lastData = data.data
    //         }
    //     })
    // },100)
}

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var msgHandler = function(Message) {
    
}

app.post('/newMessage/', (req, res) => {
  console.log(req.body)
  msgHandler(req.body,newChannelStruct(req.body.CH))
  res.send('Recieved')
  //newChannelStruct("Chat 2").Send('t')
})

exports.changeDisplayName = changeDisplayName
exports.sendMessage = sendMessage

exports.on = (event,f) => {
    if(event == "message") {
        msgHandler = f
    }
}
            
exports.login = (tok) => {
    headers = {
        Cookie: "usertok="+tok+";"
    }
    axios.get("https://lcldev.net/api/getUsername.php",{headers: headers}).then(async (data) => {
        console.log('Logged in as '+data.data)
    })
    token = tok
    start()
    app.listen(3000, () => {
      console.log(`Example app listening on port 3000`)
    })
}