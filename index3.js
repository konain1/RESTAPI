

const express = require('express')

const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/AnimeDB')
.then(()=>console.log('anime db connected'))


// structure
const animeSchema = new mongoose.Schema({
    protoganas:{
        type:String,
        require:true
    },
    showName:{
        type:String,
        require:true
    },
    episodes:{
        type:Number,

    }
})

// Document on db

const Anime = new mongoose.model('animeDB',animeSchema)


app.get('/',(req,res)=>{
    
    res.status(200).json({msg:'all data fetched'})
})

app.use(express.json())
app.post('/',(req,res)=>{
    const hero = req.body.hero;
    const show = req.body.show;
    const episode = req.body.episode;

    const newShow = {
        protoganas:hero,
        showName:show,
        episodes:episode
    }

    const naruto = new Anime(newShow)
    naruto.save();
    res.json({msg:"connected to db"})
})

app.listen(4010)