const express = require ("express");
const https = require('https');
const bodyParser =require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const place =req.body.cityName;
  const apikey="2eb96f49d4d6f9c49619cc3f219eac7d";
  const units = "metric";
  const url = ("https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+apikey+"&units="+units+"");
  https.get(url,function(response){
    console.log(response.StatusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp;
      const icon = weatherData.weather[0].icon
      const imgURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      const weatherDescription = weatherData.weather[0].description
      res.write("<p>The weather is currently "+weatherDescription+"<p>");
      res.write("<h1>The temperature in "+place+" is "+temp+ " degree Celcius.</h1>");
      res.write("<img src="+imgURL+">")
      res.send();
    })
  })
})

app.listen(3000,function(){
  console.log("Server is started at 3000");
});
