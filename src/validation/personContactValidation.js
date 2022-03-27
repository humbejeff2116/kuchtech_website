const {body, check,  } = require('express-validator');
const  personContactValidation = [

    check('contactname').notEmpty().withMessage(' contactname field is required'),
    check('contactaddress').notEmpty().withMessage('contactaddress field is required'),
    check('contacttelephone').notEmpty().withMessage('contacttelephone field is required')
    
    
];

module.exports = personContactValidation; 