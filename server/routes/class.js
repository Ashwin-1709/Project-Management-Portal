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
        await Teacher.findOneAndUpdate({email : req.body.email} , {$push: {courses : newclass}}).clone();
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
        
        
        console.log(student);
        const enrolled = await student.courses.includes(course.id); 
        if (enrolled)
            return res.status(202).send("Already enrolled.");

        await Class.findOneAndUpdate({code : req.body.code} , {$push: {students : student}}).clone();
        await Student.findOneAndUpdate({email : req.body.email} , {$push: {courses : course}}).clone();
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
    else {
        console.log(classres.students);
        classres.populate('students');
        res.status(200).send(classres);
    }
});

module.exports = router;
