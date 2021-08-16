const express = require('express');
const mongoose = require('mongoose');
//DATA
const fruits = require('./data/fruits');
const Fruit = require('./fruits');
mongoose.connect('mongodb://localhost/fruitLiveSearch', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', async () => {
    console.log('Connected to MongoDB Successfully');
    if(await Fruit.countDocuments().exec() > 0) return;
    let submitFruits = [];
    fruits.forEach(fruit => {
        submitFruits.push({name: fruit});
    });
    Fruit.insertMany(submitFruits, err => {
        if(err) return console.log(err);
        console.log('SUCCESS');
    });
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/api/search', async (req, res) => {
    let search = req.body.search;
    let find = await Fruit.find({name: {$regex: new RegExp('.*'+search+'.*','i')}}).limit(10).exec();
    res.send(find);
});

app.listen(process.env.PORT || 3000, () => console.log('App listening on PORT 3000'));