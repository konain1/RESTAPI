
const mongoose = require('mongoose')


const mySchema =  new mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    }
})


const UserModel = mongoose.model("publicusers",mySchema)


module.exports = UserModel