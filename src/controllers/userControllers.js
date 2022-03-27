let User = require('../models/user');
let RegModel = require('../models/regModel');
let CourseReg  = require('../models/courseReg');
const { validationResult } = require('express-validator');





function UserController() { };
UserController.prototype = {
    getUsers: async function getUsers(req, res, next) {
        
        try {

            const users = await User.getAllUsers(); 
            return  res.render('userindex',{ users: users, title: 'members' });   
 
        }catch (err) {
            return next(err);
        }
     
    },

    getLogin: function getLogin(req, res)  {
        if (req.query.search) {
            return res.status(200).render('signup')
        }
        return res.render('login' ,{ title: 'login' })
    }, 

    postLogin: async function postLogin(req, res, next) {
        req.flash('info', 'you are now logged in')
        res.redirect('/users/');
    },

    postLogin: function postLogin(req, res, next) {
        req.flash('info', 'you are now logged in')
        res.redirect('/users/');
    },

    logOut: async function logOut(req, res) {
        req.logout();     
        req.flash('info'  , 'you are now loged out');
        res.redirect('/users/login');
    }, 

    getSignup: function getSignup(req, res)  {
        return res.render('signup',{title:'signup'})
    },

    postSignup: async function postSignup(req,res,next) {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).render('signup', { valErrors: errors.array(),title:'signup'});
            }   
            const fullname = req.body.fullname ;
            const userName = req.body.username;
            const bio = req.body.bio;
            const password = req.body.password;      
            const profileimage = (req.file) ? req.file.filename: 'noimage.jpg';
            const user = await User.getUser(userName);

            if (user) {
                req.flash('error' , 'email has already been registered on this site');
                res.location('/users/signup');
                return res.redirect('/users/signup');
            } 
            let newUser = new User ({
                fullname: fullname,
                username: username,            
                bio: bio,
                password: password,
                profileimage: profileimage
            });
        
            newUser.save(next);
            req.flash('info' , 'you are now registered'); 
            console.log(newUser); 

        }catch (err) {
            next(err);
        }  
    },

    getByEmail: async function getByEmail(req, res, next) {
        try {

            let email = req.params.email;
            const user = await User.getUserByEmail(email);
            if (!user) {
                return next();
            }
            return res.render('profile' ,{user:user});

        } catch(err) {
            next(err);
        }
           
    },

    getEditUser:  function getEditUser(req, res, next) {
        return res.render('edit');
 
    },

    postEditUser: async function postEditUser(req, res, next) {
        
        try {
            req.user.fullname = req.body.fullname;
            req.user.email= req.body.email;
            req.user.bio = req.body.bio;
            const updateUser = await req.user.save();
            req.flash('info' ,  'profile updated successfully!');
            return  res.redirect('users/edit');

        } catch(err) {
            if (err) {
                return next(err);             
            }
        }
    },

    getCourseRegForm: function getCourseRegForm(req, res, next) {
        return res.render('courseRegistration')
    },

    postCourseRegForm: async function postCourseRegForm(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).render('courseRegistration', { valErrors: errors.array(),title:'CourseRegistration'});
        }

        let title = req.body.title
        let maritalstatus = req.body.maritalstatus;
        let gender = req.body.gender;
        let email = req.body.email
        let surname = req.body.surname;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let nationality = req.body.nationality;
        let dateofbirth = req.body.dateofbirth;
        let stateoforigin = req.body.stateoforigin;
        let regnumber = req.body.regnumber;
        let level = req.body.regnumber;
        let department = req.body.department;
        let image = (req.file) ? req.file.filename: 'noimage.jpg';
        console.log(req.file)
        let coursesOffering = [];
        let username = req.user.username;
        if (username !== email) {
            req.flash('error' , 'please ensure to use the same email you used when signing up');
            res.location('/users/course-registration');
            return res.redirect('/users/course-registration');
        }
        await CourseReg.findOne({ email: email} , function(err,user) {
            if (err) {
                next(err);
            }
            if(user){
                req.flash('error' , 'email has already been used for course registration ');
                res.location('/users/course-registration');
                return res.redirect('/users/course-registration');
            } 
    
            let courseReg =  CourseReg ({
                title,
                maritalstatus,
                gender,
                email,
                surname,
                firstname,
                lastname,
                nationality,
                dateofbirth,
                stateoforigin,
                regnumber,
                level,
                department,
                image 
            });
        
           courseReg.save();
            console.log(courseReg);    
            req.flash('info' ,'course registration successfully carried out please enssure to print course form from your dashboard');
            return  res.redirect('/users/'); 
        })

    },

    getSchoolRegForm: function getSchoolRegForm(req, res) {
       return res.render('registration');       
    },

    postRegistration: async function postRegistration(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).render('registration', { valErrors: errors.array(),title:'registration'});
        }
       
          
    
        let title = req.body.title
        let maritalstatus = req.body.maritalstatus;
        let gender = req.body.gender;
        let cardno = req.body.cardno
        let regemail = req.body.regemail
        let surname = req.body.surname;
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let nationality = req.body.nationality;
        let religion =  req.body.religion;
        let dateofbirth = req.body.dateofbirth;
        let stateoforigin = req.body.stateoforigin;
        let username = req.user.username;
        if(username !== regemail){
            req.flash('error' , 'please ensure to use the same email you used when signing up');
            res.location('/users/registration-form');
            return res.redirect('/users/registration-form');

        }
        await RegModel.findOne({regemail:regemail} , function(err,user){
            if(err){
                next(err);
            }
            if(user){
                req.flash('error' , 'email has already been registered on this site');
                res.location('/users/registration-form');
                return res.redirect('/users/registration-form');
            } 

            let reg =  RegModel ({
                title,
                maritalstatus,
                gender,
                cardno,
                regemail,
                surname,
                firstname,
                lastname,
                nationality,
                religion,
                dateofbirth,
                stateoforigin
            });
    
            reg.save();
            console.log(reg);    
            req.flash('info' , 'personal info svaed successfully');
            return  res.redirect('/users/person-contact'); 
        })
     
    },
   
    getPersonContact: function getPersonContact(req, res) {
       return res.render('personContact');
    },

    postPersonContact: async function postPersonContact(req, res) {
        // used express-validator for server side form validation
        // check for validation errors if errors, render the same page with error array
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).render('personContact', { valErrors: errors.array(),title:'personContact'});
        }
    
        // if no errors collect form body parameters
        let contactname = req.body.contactname; 
        let contactaddress = req.body.contactaddress;
        let contacttelephone = req.body.contacttelephone;
        let username = req.user.username;
        console.log('username is ',username)
        console.log(contactaddress)
        console.log(contacttelephone)
        console.log(contactname)
        // update registration model using the login user email
        await RegModel.updateOne({regemail:username},{$set:{
            contactname:contactname,
            contactaddress:contactaddress,
            contacttelephone:contacttelephone}});
        req.flash('info' , 'emergency contact saved successfully');
        return  res.redirect('/users/educational-qualification');  
    },

    getEduQualification: function getEduQualification(req, res) {
       return res.render('eduQualification');
    },

    postEduQualification: async function postEduQualification(req,res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).render('eduQualification', { valErrors: errors.array(),title:'signup'});
        }
        let username = req.user.username;

       let primfrom = req.body.primfrom;
       let primto =req.body.primto;
       let primcertobtained =req.body.primcertobtained;
       let primschoolname =req.body.primschoolname;
       let secfrom =req.body.secfrom;
       let secto =req.body.secto;
       let seccertobtained=req.body.seccertobtained;
       let secschoolname=req.body.secschoolname;
       let olevelexamname=req.body.olevelexamname;
       let olevelexameyear=req.body.olevelexameyear;
       
       let oexamsub1 = req.body.oexamsub1;      
       let oexamsub2 = req.body.oexamsub2;     
       let oexamsub3 = req.body.oexamsub3;    
       let oexamsub4 = req.body.oexamsub4;      
       let oexamsub5 = req.body.oexamsub5;      
       let oexamsub6 = req.body.oexamsub6;    
       let oexamsub7 = req.body.oexamsub7;     
       let oexamsub8 = req.body.oexamsub8;     
       let oexamsub9 = req.body.oexamsub9;     
       let oexamsub10 = req.body.oexamsub10;

       let oexamgrade1 = req.body.oexamgrade1;
       let oexamgrade2 = req.body.oexamgrade2;
       let oexamgrade3 = req.body.oexamgrade3;
       let oexamgrade4 = req.body.oexamgrade4;
       let oexamgrade5 = req.body.oexamgrade5;
       let oexamgrade6 = req.body.oexamgrade6;
       let oexamgrade7 = req.body.oexamgrade7;
       let oexamgrade8 = req.body.oexamgrade8;
       let oexamgrade9 = req.body.oexamgrade9;
       let oexamgrade10 = req.body.oexamgrade10;

       let olevelsubjects = [   
           oexamsub1,oexamsub2,oexamsub3,oexamsub4,oexamsub5,
           oexamsub6,oexamsub7,oexamsub8,oexamsub9,oexamsub10
        ];

       let olevelgrades = [
        oexamgrade1,oexamgrade2,oexamgrade3,oexamgrade4,oexamgrade5,
        oexamgrade6,oexamgrade7,oexamgrade8,oexamgrade9,oexamgrade10
       ];

       await RegModel.update(
           {regemail:username},
           {$set:{
               primfrom,primto,primcertobtained,primschoolname,secfrom,secto,
               seccertobtained,secschoolname, olevelexamname,olevelexameyear
               
            }},
           {$push:{olevelsubjects,olevelgrades}}
           );
          RegModel.find({}).then(users=>{
              console.log(users)
          })
           req.flash('info' , 'emergency contact saved successfully');
           return  res.redirect('/users/applied-program'); 

    },

    getProgram: function getProgram(req,res) {
       return res.render('programme');
    },

    postProgram: async function postProgram(req, res, next) {
        let username = req.user.username;
        let appliedprogram = req.body.appliedprogram;
       
        RegModel.update({regemail:username},{$set:{appliedprogram}});
        RegModel.find({}).then(users=> {
            console.log(users)
        })
        req.flash('info' , 'Registration completed succesfully');
        req.flash('info' , 'please ensure to print your course form from your dashboard');
        return  res.redirect('/users/'); 
       
    },
   
    getApplication: async function getApplication(req,res,next) { 
        const email = req.user.email;
        User.find({username:email})
        .then(user=>{
            if(!user){
                return next(user);
            }
            res.render('application',{user});
        })
        .catch(err=>{
            console.error(err);
            next(err);
        })
    },

    getCourseForm: async function getCourserForm(req,res,next) { 
        
        const email = req.user.username;
        await CourseReg.findOne({email:email})
            .then(user => {
                if(!user){
                    next(user);
                }
                return  res.render('courseform',{ user });

            })
            .catch(err=>{
                console.error(err)
                next(err);
            }) 
    }

}
module.exports = new UserController()