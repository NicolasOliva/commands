/* ORDER: The user (admin or order taker) will send orders to the kitchen whit the necessary products
          
          * user: User who created the order, 
          * products: necessary products of the order,
          * process: state of the order (pending state, cooking state, done state)
          * place: business that belongs
*/

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema;

let validState = {
    values: ['PENDING_STATE', 'COOKING_STATE', 'DONE_STATE']
};

// date
const d = new Date(),
      min = d.getMinutes();
if(min < 10){min = '0' + min;}
const date = `${d.getDate()}/${(d.getMonth() +1)}/${d.getFullYear()}  ${d.getHours()}:${min} hs.`;

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'users', required: [true, 'The user is required']},
    products: [{type: Schema.Types.ObjectId, ref: 'products',required: [true, 'The product is required']}],
    process: {type: String, default:'PENDING_STATE', enum: validState},
    place: {type: Schema.Types.ObjectId, ref: 'places',required: [true, 'The place is required']},
    date: {type: String, default: date},
    state: {type: Boolean, default: true, required: [true, 'The state is required']}
});

orderSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('orders', orderSchema);