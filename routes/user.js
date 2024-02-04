const express = require('express');

const Router = express.Router();

Router.use(express.json());
const UserModel = require('../model/user')



Router.get('/:id', async(req,res)=>{


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


Router.get('/',async (req, res) => {
    const allusers = await UserModel.find()
    console.log(allusers)
    res.json(allusers);
});



Router.delete('/:id',async(req,res)=>{

    const id  = req.params.id

    try {
        let deleteuser = await UserModel.findByIdAndDelete({_id : id})
        res.json(deleteuser)
        
    } catch (error) {
        res.status(403).json({msg:'invalid input or id'})
    }
})

Router.post('/', async(req, res) => {
    

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

module.exports = Router