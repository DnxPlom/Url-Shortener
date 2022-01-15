const mongoose = require("mongoose");

host = process.env.HOST || localhost

const uri = `mongodb://${host}:27017/urlshortener`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const connection = mongoose.connection;

module.exports = connection;
