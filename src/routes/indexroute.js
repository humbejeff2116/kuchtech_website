
const express = require('express');

const router = express.Router();

const indexController = require('../controllers/indexController');


router.get('/', indexController.index);

router.get('/about', indexController.about);

router.get('/admissions', indexController.getAdmission);

router.get('/entry-requirements', indexController.getEntryRequirements);

router.get('/e-application', indexController.getEApplication);

router.get('/departments', indexController.getDepartments);

router.get('/contact', indexController.contact);

router.get('/blog', indexController.blog);

// API routes
router.get('/search', indexController.search);

router.get('/blog-posts', indexController.getAllBlogPost);

module.exports = router;