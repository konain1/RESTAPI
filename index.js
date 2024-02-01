const express = require('express');
const app = express();
const mongoose = require('mongoose')

let url = 'mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/myDB'

let users = require('./mock_users.json');
const fs = require('fs');


// connecting with database
mongoose.connect(url).then(()=>console.log('created db'))
.catch((e)=>console.log(e))


// creating a schema for storing for database
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


// passing the structure 
const UserModel = mongoose.model("publicusers",mySchema)

app.use((req,res,next)=>{
    console.log('middleware 1')
    fs.appendFile('log.txt',`\n ${Date.now()} : ${req.method} : ${req.ip} ` , (err,data)=>{
        next();
    })
})


app.get('/api/users/:id', async(req,res)=>{


    let id = req.params.id

        try {
            let user = await UserModel.findOne({ _id: id }).exec()
           console.log(user )
            return res.json(user);
        } catch (error) {
            console.log('error is = ', error);
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
})
app.use(express.json()); // Add this line to parse JSON in the request body

app.get('/api/users',async (req, res) => {
    const allusers = await UserModel.find()
    console.log(allusers)
    res.json(allusers);
});
app.delete('/api/users/:id',async(req,res)=>{

    const id  = req.params.id

    try {
        let deleteuser = await UserModel.findByIdAndDelete({_id : id})
        res.json(deleteuser)
        
    } catch (error) {
        res.status(403).json({msg:'invalid input or id'})
    }
})
app.post('/api/users', async(req, res) => {
    

    const Body = req.body

    if(!Body.first_name || !Body.email){
        return res.status(403).json({msg:'all fields must be filled'})
    }

    // storing the data into structure and passing the data onto database
   const result = await UserModel.create({
        first_name:Body.first_name,
         email:Body.email,
    })
    console.log(result)
    await result.save()
    return res.status(201).json({msg:'new user added'});
});

app.listen(4005, () => {
    console.log('Server is running on http://localhost:4005');
});
