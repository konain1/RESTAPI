const express = require('express');

const Router = express.Router();



const {HandlerAllUsers , HandlerAllUsersDetailsById} = require('../controller/user')





const UserModel = require('../model/user')

Router.use(express.json());

Router.get('/:id', HandlerAllUsersDetailsById)


Router.get('/',HandlerAllUsers)


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
    await result.save()
    return res.status(201).json({msg:'new user added'});
});

module.exports = Router