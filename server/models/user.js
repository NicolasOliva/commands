/* USER: are the users that belongs to the business
       * role: The users will belongs to a role ('ADMIN_ROLE', 'ORDER_TAKER_ROLE', 'CHEF_ROLE') 
       * location: Sector where the user is in the business (For example: room order taker, aisle order taker, main kitchen, secundary kitchen)
       * place: business to witch it belongs 
*/ 


const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      uniqueValidator = require('mongoose-unique-validator'),
      {io} = require('../server'),  
      Schema = mongoose.Schema;

let validUsers = {
    values: ['ADMIN_ROLE', 'ORDER_TAKER_ROLE', 'CHEF_ROLE'],
    message: '{VALUE} not a valid role'
};

const userSchema = new Schema({
    username: { type: String, unique:true, required: [true, 'The username is required'] },
    password: { type: String, required: [true, 'The password is required'] },
    role: { type: String, default:'ORDER TAKER_ROLE', enum: validUsers},
    location: {Type: String},
    place: {type: Schema.Types.ObjectId, ref: 'places', required: [true, 'The place is required']},
    state: { type: Boolean, default: true }
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); //return true or false    
};

userSchema.methods.toJSON = function () { //(toJSON) NODE AUTOMATIC FUNCTION : return object json to the frontend whitout the password 
    let user2 = this;
    let userObject = user2.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.methods.sendOrder = () => {
    io.emit('takerOrder', {
        message: 'texto de prueba'
    });
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
});

module.exports = mongoose.model('users', userSchema);