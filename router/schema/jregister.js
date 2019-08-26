var mongoose = require('mongoose');
const registerjobseeker = mongoose.Schema({

    username:{
        type: String,
        require: true,
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
const registerjobseek =module.exports = mongoose.model('registerjobseek', registerjobseeker );