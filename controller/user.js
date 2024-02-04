
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



module.exports = {
    HandlerAllUsers,
    HandlerAllUsersDetailsById
}
