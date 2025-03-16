const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')
const graphSchema = require('./graph_schema')

app.use(cors());
app.use(express.json());

let url = 'mongodb://localhost:27017/graphs'

async function getData(){
    return mongoose.connect(url).then(async () => {
        try {
            const data = await graphSchema.find({});
            mongoose.connection.close();
            return data;
        } catch (connectionError) {
            mongoose.connection.close();
            console.log(connectionError);
        }
        console.log("Connected to db")
    }).catch((connectionError) => {
        console.log(connectionError);
        throw connectionError;
    })
}

async function insertData(title, budget, color) {
    try {
        await mongoose.connect(url);
        const newData = new graphSchema({ title: title, budget: budget, color: color });
        const data = await graphSchema.insertMany(newData);
        mongoose.connection.close();
        return data;
    } catch (dataError) {
        mongoose.connection.close();
        console.log(dataError);
        throw dataError;
    }
}


app.get('/budget', (req, res) => {
    getData().then((data) => {
        res.json(data)
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.post('/newBudget', (req, res) => {
    const {title, budget, color} = req.body;
    insertData(title, budget, color).then((data) => {
        res.json(data)
    }).catch((error) => {
        res.status(500).send(error);
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});