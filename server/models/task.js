const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String, 
        required : true
    }, 
    executedBy : {
        type : Schema.Types.ObjectId,
        ref : 'student',
        required : false
    }, 
    startTime : {
        type : Date ,
        required : false
    }, 
    endTime : {
        type : Date ,
        required : false
    }, 
    deadline : {
        type : Date ,
        required : false
    },
    completionStatus : {
        type : String , 
        required : true
    }, 
    team : {
        type : Schema.Types.ObjectId,
        ref : 'team',
        required : true
    }
});

const Task = mongoose.model('task' , TaskSchema);
module.exports = Task;
