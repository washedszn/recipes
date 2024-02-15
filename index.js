const express = require('express');
const pug = require('pug');
const marked = require('marked');
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
    const markdown = marked(); // maybe dont need this
    const markup = template({}) // maybe dont need this
    res.send(markup);
});

app.get('/:id', (req, res) => {
    // render (id) recipe in a full page
    const { id } = req.params;
    const recipe = recipes.find(r => r.id == id);
    const template = pug.compileFile('./views/recipe-details.pug');
    const markdown = marked(recipe.content);
    const markup = template({ recipe, markdown });
    res.send(markup)
})

app.listen(PORT);

console.log('Listening on port: ', PORT);