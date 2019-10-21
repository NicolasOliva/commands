/* PLACE: It is the business that contains users and products it offers. 
          * name: name of the business
*/ 

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: {type: String, unique: true, required: [true, 'The name is required']},
    users: [{type: Schema.Types.ObjectId, ref: 'users'}],
    products: [{type: Schema.Types.ObjectId, ref: 'products'}],
    state: {type: Boolean, default: true, required: [true, 'The state is required']}
});

placeSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('places', placeSchema);