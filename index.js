const express = require('express');
const app = express();

let users = require('./mock_users.json');
const router = express.Router();

// router.route('/api/users/:id').get((req, res) => {
//     let id = Number(req.params.id);

//     try {
//         if (id < 1 || users.length < id) {
//             return res.status(401).json({ msg: 'invalid id' });
//         }

//         let user = users.filter(user => user.id === id);
//         return res.json(user);
//     } catch (error) {
//         console.log('error is = ', error);
//         return res.status(500).json({ msg: 'Internal Server Error' });
//     }
// }).delete((req, res) => {
//     let id = Number(req.params.id);

//     let NewList = users.filter((user) => user.id !== id);
//     users = NewList;

//     console.log(NewList);
//     return res.json(NewList);
// }).put((req, res) => {
//     let id = Number(req.params.id);

//     let myemail = 'newEmail@gmail.com';

//     // Find the index of the user with the given id
//     let index = users.findIndex(user => user.id === id);

//     if (index !== -1) {
//         // Update the email of the user at the found index
//         users[index].email = myemail;
//         return res.json(users[index]);
//     }

//     return res.status(404).json({ msg: `No user found with id = ${id}` });
// });
app.get('/api/users/:id',(req,res)=>{


    let id = Number(req.params.id);

        try {
            if (id < 1 || users.length < id) {
                return res.status(401).json({ msg: 'invalid id' });
            }
    
            let user = users.filter(user => user.id === id);
            return res.json(user);
        } catch (error) {
            console.log('error is = ', error);
            return res.status(500).json({ msg: 'Internal Server Error' });
        }
})
app.use(express.json()); // Add this line to parse JSON in the request body
app.use('/api/users', router);

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users', (req, res) => {
    // let newUser = {
    //     id: users.length + 1,
    //     first_name: 'konain',
    //     email: 'konain@gmail.com',
    //     gender: 'male',
    //     company: 'innovasor'
    // };

    const Body = req.body
    // users.push(newUser);
    users.push({
        first_name:Body.first_name,
        email:Body.email,
        gender:Body.gender,
        company:Body.company,
        id:users.length+1
    })

    return res.json({msg:'new user added'});
});

app.listen(4005, () => {
    console.log('Server is running on http://localhost:4005');
});
