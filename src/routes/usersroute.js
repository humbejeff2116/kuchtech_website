

const express = require('express');

const passport = require('passport');

var multer = require('multer');

var upload = multer({dest :'public/uploads'});

const userController = require('../controllers/userControllers');

const signUpvalidation = require('../validation/signupValidation');

const registrationValidation = require('../validation/registrationValidation');

const personContactValidation = require('../validation/personContactValidation');

const eduQualValidation = require('../validation/eduQualValidation');

const appProgramValidation = require('../validation/appProgramValidation');

const courseRegistrationValidation = require('../validation/courseRegistrationValidation');


let ensureAuthenticated = require('../auth/routeAuth')

const router = express.Router();

router.get('/', ensureAuthenticated, userController.getUsers)
// sign up routes
    router.get('/signup',userController.getSignup);

    router.post('/signup',

        upload.single('profileimage'),signUpvalidation,userController.postSignup ,

        passport.authenticate('local' , {
            successRedirect: '/users/',
            failureRedirect:'/users/signup',
            failureFlash: true
        })

    );

    // login routes
    router.get('/login' , userController.getLogin);

    router.post('/login' , 

        passport.authenticate('local' , {
            failureRedirect: '/users/login',
            failureFlash: true,     
        }),

        userController.postLogin 
    );

    router.get('/logout', userController.logOut);
    
    router.get('/edit', ensureAuthenticated, userController.getEditUser);

    router.post('/edit',ensureAuthenticated, userController.postEditUser);
    
    router.get('/registration', ensureAuthenticated, userController.getSchoolRegForm);

    router.post('/registration', ensureAuthenticated, registrationValidation, userController.postRegistration);

    router.get('/course-registration', ensureAuthenticated, userController.getCourseRegForm);

    router.post('/course-registration',

        ensureAuthenticated, 

        upload.single('image'),

        courseRegistrationValidation,

        userController.postCourseRegForm
    );

    router.get('/person-contact', ensureAuthenticated,userController.getPersonContact);

    router.post('/person-contact', ensureAuthenticated, personContactValidation, userController.postPersonContact)
    

    router.get('/educational-qualification',ensureAuthenticated,userController.getEduQualification)

    router.post('/educational-qualification',

        ensureAuthenticated,

        eduQualValidation,

        userController.postEduQualification 

    );

    router.get('/applied-program',ensureAuthenticated,userController.getProgram);

    router.post('/applied-program',ensureAuthenticated,appProgramValidation,userController.postProgram);

    router.get('/course-form',userController.getCourseForm);

    router.get('/application', userController.getApplication);

    router.get('/:email' , userController.getByEmail);
   
module.exports = router;