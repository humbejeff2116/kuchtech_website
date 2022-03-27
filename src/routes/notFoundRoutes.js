
const express = require('express');

const router = express.Router();


router.use((req, res) => {

    res.status(404).render('not-found/404', { title:'error' });

});
// handle caught errors
router.use((err, req, res, next) => {

    console.error(err);

    next(err);
})

router.use((err, req, res, next) => {
   
    res.status(500).render('server-error/505');

})

module.exports = router;