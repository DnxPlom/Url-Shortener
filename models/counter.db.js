const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
    lastId: {
        type: Number,
        default: 0
    },
    name: {
        type: String,
        default: "onlycounter"
    }
})

module.exports = mongoose.model("counter", counterSchema);