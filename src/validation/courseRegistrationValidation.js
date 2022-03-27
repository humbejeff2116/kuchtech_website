









const {body, check,  } = require('express-validator');

const CourseRegistrationValidation = [
    check('title').notEmpty().withMessage('title field is required'),
    check('maritalstatus').notEmpty().withMessage('maritalstatus field is required'),
    check('gender').notEmpty().withMessage('gender field is required'),
    check('email').notEmpty().withMessage('regemail field is required'),
    check('surname').notEmpty().withMessage('surname field is required'),
    check('firstname').notEmpty().withMessage('firstname field is required'),
    check('lastname').notEmpty().withMessage('lastname field is required'),
    check('nationality').notEmpty().withMessage('nationality field is required'),
    check('dateofbirth').notEmpty().withMessage('dateofbirth field is required'), 
    check('stateoforigin' ).notEmpty().withMessage('stateoforigin field is required'),
    check('regnumber' ).notEmpty().withMessage('regnumber field is required'),
    check('level' ).notEmpty().withMessage('level field is required'),
    check('department' ).notEmpty().withMessage('department field is required'),
   
]
module.exports = CourseRegistrationValidation; 