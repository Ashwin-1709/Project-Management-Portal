const express = require("express");
const app = express();
const port = 5000;
const logger = require("morgan");
const bodyParser = require("body-parser");

var cors = require('cors');
var corsOptions = {
    origin : ['http://localhost:3000']
};
app.use(cors(corsOptions));

const teacher = require("./routes/teacher.js");
const classes = require("./routes/class.js");
const student = require("./routes/student.js");
const team = require("./routes/teams.js")
const task = require("./routes/task.js")

var util = require('util');
require('dotenv').config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(logger("dev"));

app.use("/teacher" , teacher);
app.use("/class" , classes);
app.use("/student", student)
app.use("/team", team)
app.use("/task" , task)

var encoder = new util.TextEncoder('utf-8');

const dbURL = process.env.DATABASE_URL;
const mongoose = require("mongoose");

mongoose.connect(dbURL , {useNewUrlParser: true , useUnifiedTopology : true})
    .then((result) => {
        app.listen(port , function() {
            console.log("Server running\n");
        });
        console.log("Connected to database\n");
    })
    .catch((err) => console.log(err));
