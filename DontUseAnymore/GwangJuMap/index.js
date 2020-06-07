var FILE_DEFAULT = "main.html";

const express = require('express');
const app = express();
const fs = require('fs')
const port = 8090;

app.use(express.static(__dirname + '/'));

app.get('/', (req, res)=>{
  fs.readFile(FILE_DEFAULT, function(error, data){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.listen(port, () => console.log("server opened port 8090"));