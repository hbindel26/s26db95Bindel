var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'Tires App', user : req.user });
});

/* GET registration page. */
router.get('/register', function(req, res) {
    res.render('register', { title: 'Tires App Registration'});
});

/* POST registration logic. */
router.post('/register', function(req, res) {
    Account.findOne({ username : req.body.username })
        .then(function (user){
            if(user != null ){
                console.log("exists " + req.body.username)
                return res.render('register', { title: 'Registration', 
                    message: 'Existing User', auth: false });
            }
            let newAccount = new Account({ username : req.body.username });
            Account.register(newAccount, req.body.password, function(err, user){
                if (err) {
                    console.log("db creation issue " + err)
                    return res.render('register', { title: 'Registration', 
                        message: 'access error', auth: false });
                }
                if(!user){
                    return res.render('register', { title: 'Registration', 
                        message: 'access error', auth: false });
                }
                console.log('Success, redirecting to home');
                res.redirect('/');
            });
        })
        .catch(function (err){
            return res.render('register', { title: 'Registration', 
                message: 'Registration error', auth: false });
        });
});

/* GET login page. */
router.get('/login', function(req, res) {
    res.render('login', { title: 'Tires App Login', user : req.user });
});

/* POST login logic. */
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

/* GET logout logic. */
router.get('/logout', function(req, res) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
