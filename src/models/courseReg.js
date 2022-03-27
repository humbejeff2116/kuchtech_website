













const mongoose = require('mongoose');


let CourseRegSchema = new mongoose.Schema({
    title:{type:String},
    maritalstatus:{type:String, required:true},
    gender:{type:String, required:true},
    email:{type:String, required:true},
    surname:{type: String , required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    nationality:{type:String, required:true},
    dateofbirth:{type:String, required:true},
    stateoforigin:{type:String, required:true},
    regnumber:{type:String,require:true},
    level:{type:String, required:true},
    department:{type:String, required:true},
    image:{type: String},
    coursesOffering:[String],
    createdate:{ type:Date , default: Date.now},
});

const CourseReg = mongoose.model('courseRegistration', CourseRegSchema);
module.exports = CourseReg;