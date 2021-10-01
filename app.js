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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=a3fa929a5a7fb4365ea46c103e2db342`;
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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Port running in ${port}`));
