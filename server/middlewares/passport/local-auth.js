const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      User = require('../../models/user');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null,user);
});

passport.use('local-signIn', new LocalStrategy({

    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

    }, async (req, username, password, done) => {

        const user = await User.findOne({username: username});

        if(!user){
            return done(null,false,req.flash('signinMessage', 'No user found'));
        }

        if(!user.comparePassword(password)){
            return done(null,false,req.flash('signinMessage', 'The password is incorrect'));
        }
        
        done(null,user);

    }));











