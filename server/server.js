const express = require('express'),   
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      flash = require('connect-flash'),
      socketIO = require('socket.io'),
      http = require('http'),
      app = express();  

require ('./config');
require ('./database.js');
require('./middlewares/passport/local-auth');  
require('../views/hbs/hbs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

//folder static
app.use(express.static(process.cwd() + '/views/assets')); 

//session
app.use(session({
    secret: 'mysession',
    resave: false,
    saveUninitialized: false
}));

//flash
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//hbs
app.set('view engine', 'hbs');

//variables flash
app.use((req,res,next) => {
    res.locals.signupMessage = req.flash('signupMessage');
    res.locals.signinMessage = req.flash('signinMessage');
    res.locals.user = req.user;     
    next();
});

//sockets (don't work whit express)
let server = http.createServer(app);
let io = socketIO(server);
module.exports = io;
require('./sockets/socket');

//routes
app.use('/',require('./routes/index'));

server.listen(process.env.PORT, () => {
    console.log('Run app on port', process.env.PORT);
})

/* test sockets 

io.on('connect', function(client){
    console.log('Se realizo conexion con el frontend');
    client.on('disconnect', function(client){
        console.log('Desconexion con el frontend');
    });
    client.on('app', function(message){
        console.log(message);
    });
}); */