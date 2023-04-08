const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Class = require('../models/class')

router.get('/', async function(req, res){
    let team = await Team.findById(req.query.id).clone();
    await team.populate('class');
    await team.populate('manager')
    await team.populate('members');
    await team.populate('tasks');
    return res.status(200).send(team);
});

router.post('/', async function(req, res){

    let team = await Team.findOne({class:req.body.class, members:{$elemMatch:{$eq:req.body.manager}}}).clone()

    if (team)
        return res.status(409).send("Already a member of a team!")

    team = await Team.findOne({name : req.body.name, class : req.body.class}).clone();
    
    if (team)
        return res.status(409).send("Team name already in use. Please select a different name.");
    
    team = new Team({
        name : req.body.name,
        projectName : req.body.projectName,
        class : req.body.class,
        manager : req.body.manager,
        members : [req.body.manager]
    });

    await team.save();
    
    await Class.findByIdAndUpdate(
        req.body.class,
        {$push: {teams : team}}
    );
    
    return res.status(200).send("Team created successfully!");
});

module.exports = router

    