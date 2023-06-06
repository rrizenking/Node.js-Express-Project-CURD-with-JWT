const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type:String,
        require:[true, 'Pl enter name']
    },
    email:{
        type:String,
        require:[true, 'Pl enter email']
    },
    mobile:{
        type:String,
        require:[true, 'Pl enter mobile']
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Contact", contactSchema);