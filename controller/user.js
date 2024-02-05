
const UserModel = require('../model/user')




 async function HandlerAllUsers(req,res){

    try {
        let allusers = await UserModel.find()
        console.log(allusers)
        return res.json(allusers);
    } catch (error) {
        
        return res.json({msg:'something wrong'})
    }
    
}

 async function HandlerAllUsersDetailsById(req,res){
    let id = req.params.id

        try {
            let user = await UserModel.findOne({ _id: id }).exec()
           console.log(user )
            return res.json(user);
        } catch (error) {
            console.log('error is = ', error);
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
}

async function HandlerDeleteUser(req,res){
    const id  = req.params.id

    try {
        let deleteuser = await UserModel.findByIdAndDelete({_id : id})
        res.json(deleteuser)
        
    } catch (error) {
        res.status(403).json({msg:'invalid input or id'})
    }
}

async function HandlerCreateuser(req,res){

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
}

module.exports = {
    HandlerAllUsers,
    HandlerAllUsersDetailsById,
    HandlerDeleteUser,
    HandlerCreateuser
}
