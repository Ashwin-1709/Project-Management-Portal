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
        type : [mongoose.Schema.Types.Mixed] , 
        required : false
    },
    teams : {
        type : [{ type : Schema.Types.ObjectId, ref : 'team'}]
    }
    
} , {timestamps : true});

const Classes = mongoose.model('class' , ClassSchema);
module.exports = Classes;
