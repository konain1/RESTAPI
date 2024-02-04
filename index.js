const express = require('express');
const app = express();

const mongoose = require('mongoose')

const userRouter = require('./routes/user')

const userModel = require('./model/user')


let url = 'mongodb+srv://konain7:Kaunain%4099@cluster0.rmyvhx6.mongodb.net/publicusers'




// connecting with database
mongoose.connect(url).then(()=>console.log('created db'))
.catch((e)=>console.log(e))

// route

app.use('/api/users/',userRouter)

app.listen(4005, () => {
    console.log('Server is running on http://localhost:4005');
});
