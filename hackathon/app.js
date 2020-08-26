var FILE_DEFAULT = "main.html";
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
var port = 8080;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  fs.readFile(FILE_DEFAULT, function(error, data){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.listen(port, () => console.log("server opened port 8080"));

