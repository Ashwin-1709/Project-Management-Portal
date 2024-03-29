const express = require("express");
const router = express.Router();
const Teacher = require("./../models/teacher.js");
const Classes = require("./../models/class.js");

router.post("/register/" , function(req , res) {
    Teacher.find({email : req.body.email.toString()} , function(err , obj) {
        if(obj.length)
            return res.status(500).send("Email already registered");
    })
    .clone()
    .then((results) => {
        if(!results.length) {
            Teacher.find({phone : req.body.phone.toString()} , function(err , obj) {
                if(obj.length)
                    return res.status(500).send("Phone number already registered");
            })
            .clone()
            .then((results) => {
                if(!results.length) {
                    const teacher = new Teacher({
                        name : req.body.name.toString() , 
                        email : req.body.email.toString() , 
                        password : req.body.password.toString() ,
                        phone : req.body.phone.toString() , 
                    });
                    teacher.save()
                    .then((results) => {
                        return res.send(results);
                    })
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => {console.log(err)});
        }
    })
    .catch((err) => {console.log(err)});
});

router.post("/login/" , function(req , res) {
    Teacher.find({email : req.body.email.toString()} , function(err , obj) {
        if(err) 
            return console.log(err);
        if(!obj.length) 
            return res.status(404).send("User does not exit");
        let TeacherObj = obj[0];
        if(TeacherObj.password === req.body.password.toString())
            return res.status(200).send(TeacherObj);
        return res.status(500).send("Incorrect Password");
    })
    .clone()
    .catch((err) => {console.log(err)});
});

router.post("/profile" , async function(req , res) {
    let teacherObj = await Teacher.findOne({email : req.body.email.toString()}).clone();
    try {
        let profile = {
            "name" : teacherObj.name.toString() , 
            "email" : teacherObj.email.toString() , 
            "phone" : teacherObj.phone.toString()
        };
        res.status(200).send(JSON.stringify(profile));
    } catch(err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

router.post("/classes" , async function(req , res) {
    let teacherObj = await Teacher.findOne({email : req.body.email.toString()}).clone();
    if(teacherObj === null)
        return res.status(500).send("Not a valid teacher");
    await teacherObj.populate('courses');
    return res.status(200).send(teacherObj);
});

router.get("/class/" , async(req , res) => {
    const classres = await Classes.findById(req.query.id.toString()).clone();
    if(classres == null)
        res.status(500).send("No such class");
    else {
        await classres.populate('students');
        await classres.populate({
            path: 'teams',
            populate: [{path: 'manager'}, {path: 'members'}]
        });
        return res.status(200).send(classres);
    }
});

module.exports = router;    
