const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Fruit', fruitSchema);