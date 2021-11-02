const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    originalUrl:String,
    date: {
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model("Url", urlSchema);