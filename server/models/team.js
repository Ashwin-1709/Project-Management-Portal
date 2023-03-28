const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = Schema({
    name : {
        type : String,
        required : true
    },

    class : {
        type : Schema.Types.ObjectId,
        ref : 'class',
        required : true
    },

    manager : {
        type : Schema.Types.ObjectId,
        ref : 'student',
        required : true
    },

    members : {
        type : [{ type : Schema.Types.ObjectId, ref : 'student'}]
    }
}, {timestamps:true});

const Team = mongoose.model('team', teamSchema);
module.exports = Team;
