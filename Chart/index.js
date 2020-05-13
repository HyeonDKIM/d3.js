var FILE_DEFAULT = "main.html";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const fs = require('fs')
var port = 8070;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

app.get('/', (req, res)=>{
  fs.readFile(FILE_DEFAULT, function(error, data){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(data);
  });
});

app.listen(port, () => console.log("server opened port 8070"));

mongoose.connect('mongodb://localhost:27017/corona'); // 기본 설정에 따라 포트가 상이 할 수 있습니다.
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});


/*
var testSchema = mongoose.Schema({
	name: String
});

testSchema.methods.speak = function () {
	var greeting = this.name
	? "Meow name is " + this.name
	: "I don't have a name"
	console.log("speak() - " + greeting);
}

var TestModel = mongoose.model("TestModel", testSchema);

var testIns = new TestModel({ name: "testIns"});

testIns.save(function(err, testIns){
	if(err) return console.error(err);
	testIns.speak();
});

TestModel.find(function(err, models){
	if(err) return console.error(err);
	console.log("find() - "+models);
});

TestModel.find({name:/^testIns/});

*/