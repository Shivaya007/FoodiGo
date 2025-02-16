const mongoose =require('mongoose')
const { Schema }= mongoose;

const UserSchema = new Schema({
    name :{
        type: String,
        required: true,

    },
    location:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        reuired:true
    },
    password:{
        type:String,
        reuired:true
    },
    date:{
        type:Date,
        default:Date.now
    }
       


});
module.exports = mongoose.model('user',UserSchema);