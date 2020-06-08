var FILE_DEFAULT = "main.html";
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs')
var port = 8070;

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
  fs.readFile(FILE_DEFAULT, function(error, data){
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end(data);
  });
});

mongoose.connect('mongodb://localhost:27017/corona');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("mongo db connection OK.");
});

app.get('/api/patient', function(req, result){
	db.collection("PatientInfo").find().toArray(function(err, res){
		if (err) throw err;
		result.json(res);
	})
});

app.get('/api/patient_num', function(req, result){
	db.collection("Time").find().toArray(function(err, res){
		if (err) throw err;
		result.json(res);
	})
});

app.get('/api/world', function(req, result){
	db.collection("WorldData").find().toArray(function(err, res){
		if (err) throw err;
		result.json(res);
	})
});

app.get('/api/patient_region', function(req, result){
	db.collection("TimeProvince").find().toArray(function(err, res){
		if (err) throw err;
		result.json(res);
	})
});

app.get('/api/patient_route', function(req, result){
	db.collection("PatientRoute").find().toArray(function(err, res){
		if (err) throw err;
		result.json(res);
	})
});


app.listen(port, () => console.log("server opened port 8070"));

