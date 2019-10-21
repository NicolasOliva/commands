/* PRODUCT: They are the products offered by the business
            * name: name of the product
            * description: features of the product
            * place: business to which it belongs
*/

const mongoose = require('mongoose'),
      uniqueValidator = require('mongoose-unique-validator'),
      Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: [true, 'The name is required'] },
    description: {type: String},
    place: {type: Schema.Types.ObjectId, ref: 'places', required: [true, 'The place is required']},
    state: {type: Boolean, default: true}
});

productSchema.plugin(uniqueValidator,{
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('products', productSchema);