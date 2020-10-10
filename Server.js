var express = require("express");
var app = express();
var portl = 3000;
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydb");
var Schema = mongoose.Schema;
var videoSchema = new Schema({
  title: String,
  url: String,
  description: String
});
var videos = mongoose.model("videos",videoSchema);
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.all("/*",function (req,res,next){
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Content-Type,X-Requested-With');
  next();
});
app.get('videos', function(req,res){
  videos.find({}).exec(function (err,videos){
    if(err) console.log("erreur");
    else res.json(videos)
  });
});
