const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const TeacherSchema = new Schema({
    name : {
        type : String , 
        required : true
    } , 
    email : {
        type : String , 
        required:  true
    } , 
    password : {
        type : String ,
        required : true
    } , 
    phone : {
        type : String , 
        required : true
    } ,
    courses : {
        type : [{ type : Schema.Types.ObjectId, ref : 'class'}]
    }
} , {timestamps : true});

const Teacher = mongoose.model('teacher' , TeacherSchema);
module.exports = Teacher;