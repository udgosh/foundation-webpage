var express = require('express');
const passport = require('passport');
var router = express.Router();


router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// g-auth callback
router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/'}),
        (req, res) =>{
            res.redirect('/dashboard')
        }
)

// logout use
router.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/')
})


module.exports = router;
