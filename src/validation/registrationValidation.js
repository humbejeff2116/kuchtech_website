const {body, check,  } = require('express-validator');

const registrationValidation = [
    check('title').notEmpty().withMessage('title field is required'),
    check('maritalstatus').notEmpty().withMessage('maritalstatus field is required'),
    check('gender').notEmpty().withMessage('gender field is required'),
    check('cardno').notEmpty().withMessage('cardno field is required'),
    check('regemail').notEmpty().withMessage('regemail field is required'),
    check('surname').notEmpty().withMessage('surname field is required'),
    check('firstname').notEmpty().withMessage('firstname field is required'),
    check('lastname').notEmpty().withMessage('lastname field is required'),
    check('nationality').notEmpty().withMessage('nationality field is required'),
    check('religion').notEmpty().withMessage('religion field is required'),
   
    check('stateoforigin' ).notEmpty().withMessage('stateoforigin field is required')
   
]
module.exports = registrationValidation; 