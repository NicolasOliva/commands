const express = require('express'),
      passport = require('passport'),
      app = express();

app.get('/', (req,res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local-signIn',{
    successRedirect: 'profile',
    failureRedirect: '/',
    passReqToCallback: true
}));

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = app;