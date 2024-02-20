const express = require('express');
const pug = require('pug');
const compression = require('compression');

const PORT = process.env.PORT || 3000;

const app = express();

let recipes = require('./data/recipes.json');

app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(compression());

app.get('/', (req, res) => {
    // render list of all recipes as little cards
    const template = pug.compileFile('./views/recipe-list.pug');
    const result = template({recipes});
    res.send(result);
});

app.get('/:id', (req, res) => {
    // render (id) recipe in a full page
    const { id } = req.params;
    const recipe = recipes.find(r => r.id == id);
    const template = pug.compileFile('./views/recipe-details.pug');
    const markup = template({ recipe });
    res.send(markup)
})

app.listen(PORT);

console.log('Listening on port: ', PORT);