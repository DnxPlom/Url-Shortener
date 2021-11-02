const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");

const app = express();

const connection = require("./config");
connection.once("open", () => console.log("DB Connected"));
connection.on("error", () => console.log("Error"));

app.use(cors({credentials: false}))
app.use(express.json({
    extended: false
}))


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));


app.use('/', require("./redirect"));
app.use('/api', require("./url"));

app.get('/menu', (req,res) => {
    console.log("SERVED")
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))