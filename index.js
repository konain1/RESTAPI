

const express = require('express')
const app = express();

let users = require('./mock_users.json')

// app.route('api/users/:id').get((req,res)=>{
//     let id = Number(req.params.id)
//     console.log(id)
//     let user = users.filter((user)=>{
//         return user.id = id
//     })

//     res.json(user)


// })
console.log(users.length)

app.get('/api/users/:id',(req,res)=>{

    let id = Number(req.params.id)


    if(id < 1 || users.length < id){
       return res.status(401).json({msg:'invalid id'})
    }
    
    let user = users.filter(user=> user.id === id)
    return res.json(user)


})

app.get('/api/users',(req,res)=>{
    res.json(users)
})

app.post('/users',(req,res)=>{
   let newUser = {
    id:1001,
    first_name:'konain',
    email:'konain@gmail.com',
    gender:'male',
    company:'innovasor'
    }

    users.push(newUser)

    return res.json(newUser)
})
app.delete('/users/:id',(req,res)=>{
    let id =  Number(req.params.id)

    let NewList = users.filter((user)=> user.id != id)
    users = NewList

    console.log(NewList)
    return res.json(NewList)
})



// PUT
    app.put('/users/:id', (req, res) => {
        let id = Number(req.params.id);

        let myemail = 'newEmail@gmail.com';

        // Find the index of the user with the given id

        let index = users.findIndex(user => user.id === id);
        
        
        if (index !== -1) {
        // Update the email of the user at the found index
        users[index].email = myemail;
        return res.json(users[index]);
    }

    return res.status(404).json({ msg: `No user found with id = ${id}` });
});



app.listen(4005)