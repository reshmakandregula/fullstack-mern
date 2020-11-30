const express = require('express');
const router = express.Router();
const user = require('../modals/UserModal');



router.get('/', (req, res) => {
    user.find()
         .then(data => res.json(data))
         .catch(err => res.status(400).json('Error:' + err));
    }); 


// router.post('/', async (req, res) => {
//     const {firstName, lastName, age, gender} = req.body;
//     try{
//         const newUser = new User({
//             firstName,
//             lastName,
//             age,
//             gender
//         });

//         const nuser = await newUser.save();

//         res.json(nuser);
//     }catch(err) {
//         console.error(err.message);
//         res.status(500).send('Server Error..!')
//     }

// });

router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = req.body.age;
    const gender = req.body.gender;

    const newUser = new user({
                    firstName,
                    lastName,
                    age,
                    gender
                });

                const nuser= newUser.save()
                .then(() => res.json(nuser))
                .catch(err => res.status(400).json('Error:' + err));
})


router.put('/:id', (req, res) => {
    res.send('update contacts');
});


router.delete('/:id', (req, res) => {
    res.send('delete contacts');
});


module.exports = router;