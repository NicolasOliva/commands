const express = require('express'),
      checkRoleTaker = require('../middlewares/authorization'),
      Order = require('../models/order'),
      {Socket} = require('../sockets/socket'),
      socket = new Socket(),
      app = express();
      

app.get('/order/:place', checkRoleTaker, (req,res) => {
    
    Order.find({place: req.params.place, state: true}, (err, orders) => {
        
        if(err){
            return res.json({
                ok:false,
                message: 'Not found orders'
            })
        }

        res.json({
            ok: true,
            orders
        })

    })  

});

app.post('/order', checkRoleTaker, (req,res) => {
    let order = new Order({
        user: req.body.user,
        products: req.body.products,
        process: req.body.process,
        place: req.body.place
    });

    order.save()
        .then(orderDB => {
            socket.sendOrder(orderDB);
            res.json({
            ok: true,
            order:(orderDB)})
        
        })
        .catch(err => {
            res.json({
                ok: false,
                err });
            });

});

app.put('/order/:id', checkRoleTaker, (req,res) => {

    let id = req.params.id,
        body = req.body;

    Order.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false}, (err, orderDB) => { /*useFindAndModify (whitout this option the query is deprecated)*/

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                order: orderDB
            })
        }

    })

});

app.delete('/order/:id', checkRoleTaker, (req,res) => {

    Order.findByIdAndUpdate(req.params.id, {state: false},{useFindAndModify: false}, (err,orderDB) => {

        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }else {
            res.json({
                ok:true,
                message: 'Order deleted successfully'
            })
        }

    });

});

module.exports = app; 