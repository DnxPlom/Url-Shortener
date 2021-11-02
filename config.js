const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/urlshortener";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

module.exports = connection;