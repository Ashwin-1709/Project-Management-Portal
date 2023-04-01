const express = require("express");
const Student = require("../models/student.js");
const router = express.Router();
const Class = require("./../models/class.js");
const Teacher = require("./../models/teacher.js");

async function CheckClassCode(code) {
    const classes = Class.find({code : code}).clone();
    return classes;
}

// TODO - async function for class enrollment

router.post("/create/" , async(req , res) => {
    const classres = await CheckClassCode(req.body.code);
    if(classres.length)
        res.status(500).send("Class with the code already exists");
    else {
        const newclass = new Class({
            title : req.body.title ,
            code : req.body.code
        });
        await newclass.save();
        let teacher = await Teacher.findOne({email : req.body.email}).clone();
        if(teacher == null) return res.status(500).send("Not valid teacher");
        teacher.courses.push(req.body.code);
        await teacher.save();
        return res.status(200).send("class created");
    }
});


router.get("/search/" , async(req , res) => {
    console.log(req.query.code)
    const classres = await Class.findOne({code : req.query.code}).clone();
    if(classres == null)
        return res.status(500).send("No such class");
    else{
        await classres.populate('teams');
        return res.status(200).send(classres);
    }
});

router.post("/enrol/", async(req, res) => {
    
    try {     
        var course = await Class.findOne({code : req.body.code}).clone();
        var student = await Student.findOne({email : req.body.email}).clone();
        
        const enrolled = await student.courses.includes(course.code); 
        
        if (enrolled)
            return res.status(202).send("Already enrolled.");

        course.students.push(student.email);
        student.courses.push(course.code);

        await course.save();
        await student.save();
        return res.status(200).send("Successful");
    
    } catch (err) {
        console.log(err)
        return res.status(500).send("Error occurred");
    }        

});

router.post("/students/" , async(req , res) => {
    const classres = await Class.findOne({code : req.body.code}).clone();
    if(classres == null)
        res.status(500).send("No such class");
    else res.status(200).send(classres.students);
});

module.exports = router;
