const express = require("express");
const validUrl  = require("valid-url");
const shortId = require("shortid")

const router = express.Router();

const Url = require("./models/db");
const Counter = require("./models/counter.db");

const baseUrl = "http://localhost:5000";
const constant = 56799999999
const incConstant = 2045258573


function generateCode(id) {
    let map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = [];
    while (id) {
        code.push(map[id%62])
        id = Math.floor(id/62)
    }
    code.reverse()
    return code.join("")
}

router.post("/shorten", async (req, res) => {
    let counter, lastId, newLastId, code;
    const { originalUrl } = req.body;
    console.log(originalUrl)
    
    

    if (!validUrl.isUri(baseUrl)) {
        console.log('Invalid base url')
        return res.status(401).json("Invalid base url")
    }

    const urlCode = shortId.generate()
    if (validUrl.isUri(originalUrl)) {
        try {
            let url = await Url.findOne({ originalUrl })
            
            if (url) {
                res.json({url: `${baseUrl}/${url._id}`})
            } else {
                try {
                    counter = await Counter.findOne({name: "onlycounter"})
                    console.log(counter)
                    if (counter) {
                        lastId = counter.lastId
                        newLastId = lastId + 1 + incConstant
                    } else {
                        counter = new Counter({
                            lastId: 1000000000-1,
                            name: "onlycounter"
                        })
                        await counter.save()
                        lastId = 1000000000-1
                        newLastId = lastId
                    }
                } catch (e) { console.log(e)}

                if ( newLastId > constant ) {
                    newLastId -= constant
                    code = generateCode(newLastId);
                } else {
                    code = generateCode(newLastId)
                }
                counter.lastId = newLastId;
                await counter.save();
                

                url = new Url({
                    _id: code,
                    originalUrl,
                    date: new Date()
                })
                console.log(url)
                
                await url.save()
                res.json({url: `${baseUrl}/${url._id}`})
            
        }
    }catch (err) {
            console.log(err)
            res.status(500).json("server error")
        }
    } else {
        console.log("*********")

        res.json("invalid Url")
    }
})


module.exports = router
