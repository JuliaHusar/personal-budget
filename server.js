const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');


app.use('/', express.static('public'));

const budget = JSON.parse(fs.readFileSync('data-json.json', 'utf8'));

app.get('/hello', (req, res) => {
    res.send('Hello World!');
})

app.get('/budget', (req, res) => {
    res.json(budget);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});