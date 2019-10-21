const express = require('express'),
      bcrypt = require('bcrypt'),
      _ = require('underscore');
      User = require('../models/user'),
      [checkRoleAdmin] = require('../middlewares/authorization'),
      app = express();

app.get('/user', checkRoleAdmin, (req,res) => {
    
    User.find({state: true}, (err, users) => {
        
        if(err){
            return res.json({
                ok:false,
                message: 'Not found users'
            })
        }

        res.json({
            ok: true,
            users
        })

    })  

});

app.get('/user/:id', checkRoleAdmin, (req,res) => {
    
    User.findOne({_id: req.params.id, state: true}, (err,userDB) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        if(userDB == null){
            return res.json({
                ok:true,
                message: 'User not available'
            })
        }
        
        res.json({
            ok:true,
            userDB
        })
        
    })
});

app.post('/user', checkRoleAdmin, (req,res) => {
    
    User.findOne({username: req.body.username}, (err,userDB) => {

        if(err) {
            return res.json({
                        ok: false,
                        err });
        }
        
        if(userDB){
            return res.json({
                ok: false,
                message: 'username is already taken' });
        }
    
        let user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            role: req.body.role,
            place: req.body.place,
            location: req.body.location
        });
        
        user.save()
            .then(userDB => {
                res.json({
                    ok: true,
                    user: userDB});
            })
            .catch(err => {
                res.json({
                    ok: false,
                    err });
            });

    })
    
});

app.put('/user/:id', checkRoleAdmin, (req,res) => {

    let id = req.params.id,
        body = _.pick(req.body, ['username','password','role','place','location']);

    User.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false}, (err, userDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                user: userDB
            })
        }

    })

});

app.delete('/user/:id', checkRoleAdmin, (req,res) => {

    let id = req.params.id,
    body = {state: false};


    User.findByIdAndUpdate(id,body,{useFindAndModify: false}, (err,userDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                message: 'User deleted successfully'
            })
        }

    } )
});

module.exports = app; 