const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  extended: true }));
const server = http.createServer(app);
const fs = require("fs");

let myPort = 9010;
app.set('port', myPort);

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

let globalInputMsg = [];
app.post('/createInputMessages', (req, res) => {
  console.log('createInputMessages --------- ', req.body);
  let inputData = req.body;
  globalInputMsg.push(inputData.inputMsg);
  return res.status(200).json(globalInputMsg);
});

app.delete(`/deleteMessage/:id`, (req, res) => {
  console.log('deleteMessage --------- ', req.params);
  const getId = req.params.id.trim();
  for (let index = 0; index < globalInputMsg.length; index++) {
    const inputElement = globalInputMsg[index];
    if (inputElement.trim() === getId) {
      globalInputMsg.splice(index, 1);
    }
  }
  console.log(globalInputMsg);
  return res.status(201).json(globalInputMsg);
});

app.get('/getAllMessages', (req, res) => {
let writeStream = fs.createWriteStream("JournalDEV.txt");
  writeStream.write(globalInputMsg.toString());
  writeStream.end();
  return res.status(200).json(globalInputMsg);
});

app.get('/downloadFile', (req, res) => {
  let data = '';
  let checkVal = false;
  let readerStream = fs.createReadStream('JournalDEV.txt'); //Create a readable stream
  
  readerStream.setEncoding('UTF8'); // Set the encoding to be utf8. 
  
  // Handle stream events --> data, end, and error
  readerStream.on('data', function(chunk) {
     data += chunk;
  });
  
  readerStream.on('end',function() {
     console.log(data);
     checkVal = true;
  });
  
  readerStream.on('error', function(err) {
     console.log(err.stack);
  });
  let pipeFile = setInterval(() => {
    if (checkVal === true) {
      clearInterval(pipeFile);
      res.status(200).send(JSON.stringify(data));
    }
  }, 1000);
})
