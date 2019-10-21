const express = require('express'),
      checkRoleChef = require('../middlewares/authorization'),
      Product = require('../models/product'),
      app = express();

app.get('/product', checkRoleChef, (req,res) => {
    
    Product.find({state: true}, (err, products) => {
        
        if(err){
            return res.json({
                ok:false,
                message: 'Not found products'
            })
        }

        res.json({
            ok: true,
            products
        })

    })  

});

app.get('/product/:id', checkRoleChef, (req,res) => {
    
    Product.findOne({_id: req.params.id, state: true}, (err,productDB) => {
        
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(productDB == null){
            return res.json({
                ok:true,
                message: 'Product not available'
            })
        }

        res.json({
            ok:true,
            productDB
        })

    })
});

app.post('/product', checkRoleChef, (req,res) => {

    Product.findOne({name: req.body.name}, (err,productDB) => {

        if(err) {
            return res.json({
                        ok: false,
                        err });
        }
        
        if(productDB){
            return res.json({
                ok: false,
                message: 'name is already taken' });
        }
    
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            place: req.body.place
        });
        
        product.save()
            .then(productDB => {
                res.json({
                    ok: true,
                    product: productDB});
            })
            .catch(err => {
                res.json({
                    ok: false,
                    err });
            });

    })
    
});

app.put('/product/:id', checkRoleChef, (req,res) => {

    let id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, {new: true, useFindAndModify: false }, (err, productDB) => { /*useFindAndModify (whitout this option the query is deprecated)*/

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                product: productDB
            })
        }

    })

});

app.delete('/product/:id', checkRoleChef, (req,res) => {

    let id = req.params.id;

    Product.findByIdAndUpdate(id,{state: false},{useFindAndModify: false}, (err,productDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                message: 'Product deleted successfully'
            })
        }

    } )

});

module.exports = app; 