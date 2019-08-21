var mongoose = require('mongoose');
const userdetailsschema = mongoose.Schema({

name :{
    type: String,
    require:true,
},

username :{
    type: String,
    require:true,

},

email :{
    type: String,
    require:true,

},
phonenumber :{
    type: String,
    require:true,

},
password :{
    type: String,
    require:true,

}
});
const registerusers = module.exports = mongoose.model('registerusers', userdetailsschema );