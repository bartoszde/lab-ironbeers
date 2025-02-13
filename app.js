const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get("/beers", (request, response, next) => {
  punkAPI
  .getBeers()
  .then( (beerArr) => {
    const data = {
      beers: beerArr
      }
    response.render("beers", data);
  })
  .catch(error => console.log("houston, no beers in the fridge"));
});

app.get("/random-beer", (request, response, next) => {
  punkAPI
  .getRandom()
  .then( (responseFromAPI) => {
    const data = {
      randomBeer: responseFromAPI
    }
  response.render("random-beer", data);
    console.log(responseFromAPI)
  })
  .catch(error => console.log(error));
  });

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
