var mongoose = require('mongoose');
const jobseekerschema = mongoose.Schema({

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
currentdesignation :{
    type: String,
    require:true,

},
skillsindemand :{
    type: String,
    require:true,

},
experience :{
    type: Number,
    require:true,

},
skillsknown:{
    type: Array,
    require:true,

},
city:{
    type: String,
    require:true,

}
});
const jobseeker = module.exports = mongoose.model('jobseeker', jobseekerschema );