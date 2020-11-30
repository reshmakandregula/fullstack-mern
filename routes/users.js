const express = require('express');
const router = express.Router();
const user = require('../modals/UserModal');



router.get('/', (req, res) => {
    user.find()
         .then(data => res.json(data))
         .catch(err => res.status(400).json('Error:' + err));
    }); 
 

router.post('/', async (req, res) => {
    const {firstName, lastName, age, gender} = req.body;
    try{
        const newUser = new user({
            firstName,
            lastName,
            age,
            gender
        });

        const user1 = await newUser.save();

        res.json(user1);
    }catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error..!')
    }

});





router.put('/:id', (req, res) => {
       user.findById(req.params.id)
         .then(data => {
            data.firstname = req.body.firstname;
            data.lastname = req.body.lastname;
            data.age = Number(req.body.age);
            data.gender = req.body.gender;
            
            data.save()
            .then(() => res.json('User has been Updated...!'))
            .catch(err => res.status(400).json('Error:' + err));
         })
         .catch(err => res.status(400).json('Error:' + err));
    });



router.delete('/:id', (req, res) => {
        user.findByIdAndRemove(req.params.id)
             .then(()=> res.json('User was deleted...'))
             .catch(err => res.status(400).json('Error:' + err));
        });


module.exports = router;