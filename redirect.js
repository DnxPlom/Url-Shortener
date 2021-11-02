const express = require("express");

const router = express.Router();

const Url = require("./models/db");

router.get("/:urlCode", async (req, res) => {
    console.log("REDIRECTED")
    try {
        const url = await Url.findOne({
            _id: req.params.urlCode
        })

        if (url) {
            return res.redirect(url.originalUrl)
        } else {
            return res.status(404).json("The URL does not exist");
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json("Server Error");
    }
})

module.exports = router