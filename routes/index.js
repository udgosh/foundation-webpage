var express = require('express');
var router = express.Router();

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/',ensureGuest, (req, res) => {
    res.render('landing')
  })

router.get('/campaign', ensureGuest, function(req, res, next){
    res.render('campaign', {title: 'Campaign'});
  })



router.get('/fundraiser', ensureGuest, function(req, res, next){
  res.render('fundraiser', {title: 'Fundraising'}); 
})

router.get('/faqs', function(req, res, next){
  res.render('faqs', {title: 'Fundraising'}); 
})

router.get('/dashboard', ensureAuth, (req, res) => {
    console.log(req.user)
    res.render('dashboard' , {
      name: req.user.firstName,
    })
  })
  
module.exports = router;
