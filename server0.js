const express = require ("express");
const https = require('https');
const app = express();

const url = ("https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=2eb96f49d4d6f9c49619cc3f219eac7d&units=metric");
https.get(url,function(response){
  console.log(response);
})
app.get("/",function(req,res){
  res.send("This is running up......")
})

app.listen(4000,function(){
  console.log("Server is started at 4000");
});
