var mongoose = require('mongoose');
const companyschema = mongoose.Schema({

name :{
    type: String,
    require:true,
},

email :{
    type: String,
    require:true,

},

phonenumber:{
    type: String,
    require:true,

},
designation :{
    type: String,
    require:true,

},
experience :{
    type: Number,
    require:true,

},
skills:{
    type: Array,
    require:true,

},
location:{
    type: String,
    require:true,

},
vacancy:{
    type: Number,
    require:true,

}
});
const companyrequirement = module.exports = mongoose.model('companyrequirement', companyschema );