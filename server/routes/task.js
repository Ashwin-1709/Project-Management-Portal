const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Class = require('../models/class')
const Task = require('../models/task')

router.post("/create/" , async(req , res) => {
    let team = await Team.findById(req.body.team).clone();

    console.log(req.body.member)
    console.log(team)

    if (req.body.member != team.manager)
        return res.status(403).send("Only team manager can create tasks!")

    let task = new Task({
        description : req.body.description,
        deadline: req.body.deadline ? req.body.deadline : null,
        completionStatus : "not started",
        team : req.body.team
    });
    await task.save();
    await Team.findByIdAndUpdate(
        req.body.team,
        {$push : {tasks : task}}
    );
    return res.status(200).send("Task Added");
});

router.post("/picktask/" , async(req , res) => {
    let task = await Task.findById(req.body.task).clone();
    if(!task)
        return res.status(500).send("No such task found");
    if(task.completionStatus != "not started")
        return res.status(500).send("task already picked by some team member");
    let curTime = Date.now();
    task.executedBy = req.body.member;
    task.completionStatus = "in progress";
    task.startTime = curTime;
    await task.save();
    return res.status(200).send("Task successfully picked!");
});

router.post("/finishtask/" , async(req , res) => {
    let task = await Task.findById(req.body.task).clone();
    if(!task)
        return res.status(500).send("No such task found");
    if(task.completionStatus != "in progress")
        return res.status(500).send("task not in progress");
    if(task.executedBy != req.body.member)
        return res.status(500).send("Task not assigned to this user");
    let curTime = Date.now();
    task.endTime = curTime;
    task.completionStatus = "finished";
    await task.save();
    return res.status(200).send("Task completed");
});

module.exports = router;
