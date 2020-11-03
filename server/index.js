const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const movieRoute = require('./routes/movie');
const cors = require('cors');


const app = express();


//Uses CORS because the server and client is running on different ports
app.use(cors());


//Sets the server port to 5000
const port = 5000;

//Connects to the DB
mongoose.connect('mongodb://amdb:amdb@it2810-59.idi.ntnu.no:27017/amdb?authSource=amdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Database connected successfully`))
    .catch(err => console.log(err));


//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

//Allows CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

//Routes the requests to the correct endpoint
app.use('/movie', movieRoute);


app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});

module.exports = app;