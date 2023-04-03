const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ClassSchema = new Schema({
    title : {
        type : String , 
        required : true
    } , 
    code : {
        type : String , 
        required:  true
    } , 
    students : {
        type : [{ type : Schema.Types.ObjectId, ref : 'student'}]
    },
    teams : {
        type : [{ type : Schema.Types.ObjectId, ref : 'team'}]
    }
    
} , {timestamps : true});

const Classes = mongoose.model('class' , ClassSchema);
module.exports = Classes;
