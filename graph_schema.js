const mongoose = require('mongoose')
const { type } = require('os')

const graphSchema = new  mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    budget: {
        type: Number,
        required: true,
        unique: false
    },
    color: {
        type: String,
        required: true,
        unique: true
    }
}, {collection: 'graphs'})

module.exports = mongoose.model('graphs', graphSchema)