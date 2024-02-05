const express = require('express');

const Router = express.Router();



const {HandlerAllUsers ,  HandlerAllUsersDetailsById 
, HandlerDeleteUser , HandlerCreateuser} = require('../controller/user')





const UserModel = require('../model/user')

Router.use(express.json());

Router.get('/:id', HandlerAllUsersDetailsById)


Router.get('/',HandlerAllUsers)


Router.delete('/:id', HandlerDeleteUser)
Router.post('/', HandlerCreateuser)

module.exports = Router