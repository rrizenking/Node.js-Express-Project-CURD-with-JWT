const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true, "Pl enter username"]
    },
    email:{
        type:String,
        required:[true, "Pl enter email"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true, "Pl enter password"]
    }
},
{
    timestamp:true
})

module.exports = mongoose.model('User', userSchema);