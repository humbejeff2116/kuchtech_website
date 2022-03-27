

const {body, check,  } = require('express-validator');




const registrationValidation =[
    check('fullname').notEmpty().withMessage('fullname field is required'),
    // check('username').notEmpty().withMessage('username field is required'),
    // check('email').isEmail().withMessage('email format is incorrect'),
    check('username').notEmpty().withMessage('username field is required'),
    check('bio').notEmpty().withMessage('bio field is required'),
    check('password' ).notEmpty().withMessage('password field is required')
    .custom((value,{req})=>{
      // if(!req.body.password2){
      //   throw new Error('repeat password field is required');

      // }
      // if(!value){
      //   throw new Error('password confirmation field is empty');
    
      // }
        if(value !== req.body.password2){
          throw new Error('password confirmation is incorrect');
        } 
        return value;
    }),
    check('password').isLength({ min: 5 }).withMessage(' password should contain more than 4 characters'),
    // body('password2').isLength({ min: 5 }).withMessage(' password should be more than 5 chars')
]
module.exports = registrationValidation; 