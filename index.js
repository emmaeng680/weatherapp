// Required modules
const express = require('express');
var axios = require("axios");
const dotenv = require('dotenv').config();
const app = express();

// Other static files used are placed in the public folder
app.use(express.static("public"));

app.set("view engine", "ejs");

// Listen
app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});

// Get
app.get("/", function(req, res) {

  axios('http://ip-api.com/json')
    .then(
      function success(response) {
        console.log('User\'s Country', response.data.city);
        locationData(response)
      },

      function fail(data, status) {
        console.log('Request failed.  Returned status of',
          status);
      }
    );

    function locationData(response){
      const url= "https://api.openweathermap.org/data/2.5/weather?q="+ response.data.city +"&appid="+
      process.env.API_KEY+"&units=metric";

      axios.get(url)
      .then(function(data){
        const weatherdata= data.data;
        const temp = weatherdata.main.temp;
        const description = weatherdata.weather[0].description;
        const icon= weatherdata.weather[0].icon;
        const cityName= weatherdata.name;

        const iconurl= "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        let details= {
          city: cityName,
          temp: temp,
          description: description,
          url: iconurl,
        }

        res.render("index", details)
      })
      .catch(function(err){
        console.log(err)
      })
    }
});