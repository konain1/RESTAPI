const express = require('express')
const app = express();

const mongoose = require('mongoose');

let url = 'mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/myDB'

mongoose.connect(url).then(()=>{
    console.log('connected to db')
}).catch((e)=>{console.log(e)})


app.use(express.json())


const kittySchema = new mongoose.Schema({
    name:{
        type: String,
        require:true
    },
     email: {
    type :String,
    require:true
    }
    });
let KittenDoc = mongoose.model('kittendb',kittySchema)


// get all cats
app.get('/',async(req,res)=>{
    let allKitten = await   KittenDoc.find()
    if(!allKitten){
        res.status(404).json({msg:'no data available'})
    }
    res.send(allKitten)
})

// get specific cat

app.get('/:name',async(req,res)=>{
    let finding = req.params.name

    let gotTheCat = await KittenDoc.findOne({name:finding})

    if(!gotTheCat){
        res.status(404).send("not Data found !")
    }

    res.status(202).json({msg:gotTheCat})
})

// post user
app.post('/',(req,res)=>{
    // let {name,email} = req.body;
    let named  = req.body.name
    let emailed = req.body.email

   let reuslt =  KittenDoc.create({name:named,email:emailed})
    if(!named || !emailed){
       return res.status(404).json({msg:'user name or email missing'})
    }

    return res.json({name:`${named} and email is ${emailed}`})

})


// app.listen(4006)