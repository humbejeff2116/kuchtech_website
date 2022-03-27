



const mongoose = require('mongoose');




let RegistrationSchema = new mongoose.Schema({
    title:{type:String},
    maritalstatus:{type:String, required:true},
    gender:{type:String, required:true},
    cardno:{type:String, required:true},
    regemail:{type:String, required:true},
    surname:{type: String , required:true},
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    nationality:{type:String, required:true},
    religion:{type:String, required:true},
    dateofbirth:{type:String, required:true},
    stateoforigin:{type:String, required:true}, 


    createdate:{ type:Date , default: Date.now},
    profileimage:{type: String},

    contactname:{type:String}, 
    contactaddress:{type:String}, 
    contacttelephone:{type:String }, 

    primfrom:{type:String },
    primto:{type:String},
    primcertobtained:{type:String},
    primschoolname:{type:String},
    secfrom:{type:String },
    secto:{type:String },
    seccertobtained:{type:String },
    secschoolname:{type:String},
    olevelexamname:{type:String },
    olevelexameyear:{type:String },
    olevelsubjects:[String],
    olevelgrades:[String],

    appliedprogram:{type:String }
});

// person to be contacted in case of emergency
// ({
//    name:{type:String, required:true}, 
//    address:{type:String, required:true}, 
//    telephone:{type:String, required:true}, 
//    createdate:{ type:Date , default: Date.now},
// })
// // educational qualification
// ({
//     primfrom:{type:String, required:true},
//     primto:{type:String, required:true},
//     primcertobtained:{type:String, required:true},
//     primschoolname:{type:String, required:true},
//     secfrom:{type:String, required:true},
//     secto:{type:String, required:true},
//     seccertobtained:{type:String, required:true},
//     secschoolname:{type:String, required:true},
//     olevelexamname:{type:String, required:true},
//     olevelexameyear:{type:String, required:true},
//     olevelsubjects:[String],
//     olevelgrades:[String],

// })
// // programme applying for 
// ({
//     appliedprogram:{type:String, required:true}

// })
const Registration = mongoose.model('registration', RegistrationSchema);
module.exports = Registration;