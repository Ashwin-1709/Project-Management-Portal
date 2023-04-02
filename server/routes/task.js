const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Class = require('../models/class')
const Task = require('../models/task')

router.post("/create/" , async(req , res) => {
    let task = new Task({
        description : req.body.description,
        deadline: req.body.deadline,
        completionStatus : "not started",
        team : req.body.team
    });
    await task.save();
    await Team.findByIdAndUpdate(
        req.body.team,
        {$push : {tasks : task}}
    );
    res.status(200).send("Task Added");
});

// router.post("/picktask/" , async(req , res) => {
//     let task = Task.findOne(req.body.task).clone();
//     if(!task)
//         return res.status(500).send("No such task found");
//     if(task.completionStatus != "not started")
//         return res.status(500).send("task already picked by some team member");
//     console.log(deadline);
//     let curTime = Date.now();
//     console.log(curTime);
//     if(deadline < curTime)
// });

module.exports = router;