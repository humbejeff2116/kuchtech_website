

const {body, check,  } = require('express-validator');

const eduQualValidation =[
  
    check('primfrom').notEmpty().withMessage('primfrom field is required'),
    check('primto').notEmpty().withMessage('primto field is required'),
    check('primcertobtained').notEmpty().withMessage('primcertobtained field is required'),
    check('primschoolname').isEmail().withMessage('primschoolname format is incorrect'),
    check('secfrom').notEmpty().withMessage('secfrom field is required'),
    check('secto').notEmpty().withMessage('secto field is required'),
    check('seccertobtained' ).notEmpty().withMessage('seccertobtained field is required'),
    check('secschoolname').notEmpty().withMessage('secschoolname field is required'),
    check('olevelexamname').notEmpty().withMessage('olevelexamname field is required'),
    check('olevelexameyear').isEmail().withMessage('olevelexameyear format is incorrect'),   

    check('oexamsub1' ).notEmpty().withMessage('oexamsub1 field is required'),
    check('oexamsub2' ).notEmpty().withMessage('oexamsub2 field is required'),
    check('oexamsub3' ).notEmpty().withMessage('oexamsub3 field is required'),
    check('oexamsub4' ).notEmpty().withMessage('oexamsub4 field is required'),
    check('oexamsub5' ).notEmpty().withMessage('oexamsub5 field is required'),
    check('oexamsub6' ).notEmpty().withMessage('oexamsub6 field is required'),
    check('oexamsub7' ).notEmpty().withMessage('oexamsub7 field is required'),
    check('oexamsub8' ).notEmpty().withMessage('oexamsub8 field is required'),
    check('oexamsub9' ).notEmpty().withMessage('oexamsub9 field is required'),
    check('oexamsub10' ).notEmpty().withMessage('oexamsub10 field is required'),

    check('oexamgrade1' ).notEmpty().withMessage('oexamgrade1 field is required'),
    check('oexamgrade2' ).notEmpty().withMessage('oexamgrade2 field is required'),
    check('oexamgrade3' ).notEmpty().withMessage('oexamgrade3 field is required'),
    check('oexamgrade4' ).notEmpty().withMessage('oexamgrade4 field is required'),
    check('oexamgrade5' ).notEmpty().withMessage('oexamgrade5 field is required'),
    check('oexamgrade6' ).notEmpty().withMessage('oexamgrade6 field is required'),
    check('oexamgrade7' ).notEmpty().withMessage('oexamgrade7 field is required'),
    check('oexamgrade8' ).notEmpty().withMessage('oexamgrade8 field is required'),
    check('oexamgrade9' ).notEmpty().withMessage('oexamgrade9 field is required'),
    check('oexamgrade10' ).notEmpty().withMessage('oexamgrade10 field is required'),
   
]
module.exports = eduQualValidation; 