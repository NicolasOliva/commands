const express = require('express'),
      checkRoleAdmin = require('../middlewares/authorization'),
      Place = require('../models/place'),
      app = express();

app.get('/place', checkRoleAdmin, (req,res) => {
    
    Place.find({state: true}, (err, places) => {
        
        if(err){
            return res.json({
                ok:false,
                message: 'Not found places'
            })
        }

        res.json({
            ok: true,
            places
        })

    })  

});

app.get('/place/:id', checkRoleAdmin, (req,res) => {
    
    Place.findOne({_id: req.params.id, state: true}, (err,placeBD) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(placeBD == null){
            return res.json({
                ok:true,
                message: 'Place not available'
            })
        }

        res.json({
            ok:true,
            placeBD
        })

    })
});

app.post('/place', checkRoleAdmin, (req,res) => {

    Place.findOne({name: req.body.name}, (err,placeDB) => {

        if(err) {
            return res.json({
                        ok: false,
                        err });
        }
        
        if(placeDB){
            return res.json({
                ok: false,
                message: 'name is already taken' });
        }
    
        let place = new Place({
            name: req.body.name,
            users: req.body.users,
            products: req.body.products,
            place: req.body.place
        });
        
        place.save()
            .then(placeDB => {
                res.json({
                    ok: true,
                    place: placeDB});
            })
            .catch(err => {
                res.json({
                    ok: false,
                    err });
            });

    })
    
});

app.put('/place/:id', checkRoleAdmin, (req,res) => {

    let id = req.params.id,
        body = req.body;

    Place.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false }, (err, placeBD) => { /*useFindAndModify (whitout this option the query is deprecated)*/

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                place: placeBD
            })
        }

    })

});

app.delete('/place/:id', checkRoleAdmin, (req,res) => {

    let id = req.params.id;

    Place.findByIdAndUpdate(id,{state: false},{useFindAndModify: false}, (err,userDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                message: 'Place deleted successfully'
            })
        }

    } )

});

module.exports = app; 