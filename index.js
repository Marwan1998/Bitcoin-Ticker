const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseURL = "https://min-api.cryptocompare.com/data/pricemulti?fsyms=";
  var finalURL = baseURL + crypto +"&tsyms=" + fiat;
  console.log(finalURL);

  request(finalURL, function(error, response, body){
    var data = JSON.parse(body);
    var price = chooseVarible(crypto, fiat, data);

    res.write("<p>the time of this price is: time</p>");
    res.write("<h2>The price of " + crypto + " is: " + price + " " + fiat + "</h2>");
    res.send();

  });

});

// https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD,EUR,GBP


app.listen(3000, function() {
  console.log("Server is running on port 3000...");
});




function chooseVarible(crypto, fiat, data){

  if(crypto === "BTC"){
    if(fiat === "USD")
      return data.BTC.USD;
    else if(fiat === "GBP")
      return data.BTC.GBP;
    else if(fiat === "EUR")
      return data.BTC.EUR;

  }else if(crypto === "ETH"){
    if(fiat === "USD")
      return data.ETH.USD;
    else if(fiat === "GBP")
      return data.ETH.GBP;
    else if(fiat === "EUR")
      return data.ETH.EUR;
  }else if(crypto === "LTC"){
    if(fiat === "USD")
      return data.LTC.USD;
    else if(fiat === "GBP")
      return data.LTC.GBP;
    else if(fiat === "EUR")
      return data.LTC.EUR;
  }else return "0000.00";

}
