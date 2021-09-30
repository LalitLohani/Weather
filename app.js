const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { data: '' });
});

app.post('/', (req, res) => {
  const location = req.body.location;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;
  https.get(url, (response) => {
    if (response.statusCode == 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render('index', { data: weatherData });
      })
    }
    else {
      res.render('index', { data: "0" });
    }
  })
});



app.listen(process.env.PORT || 3000);
