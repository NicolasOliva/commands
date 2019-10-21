const express = require('express'),
      app = express();

app.use(require('./login'));
app.use(require('./user'));
app.use(require('./place'));
app.use(require('./order'));
app.use(require('./product'));

app.get('/profile', (req,res) => {
    res.render('profile');
});

app.get('/register', (req,res) => {
    res.render('register');
});

module.exports = app;