const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret = 'michrrocks'
var fetchuser = require('../middleware/fetchuser');


//--------------------------- ROUTE-1 --------------------------- 
// Create a user using POST "/auth"
router.post('/createuser',[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:6})
], 

async (req,res)=>{   
    let success = false;                             
    
    //Validating the inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

// Checking if the user with the same email exists or not
try {
    
let user = await User.findOne({email: req.body.email});
if(user){
    return res.status(400).json({success, error: "user with this email already exists"})
}

// Securing the password
const salt = await bcrypt.genSalt(10);
const securePass = await bcrypt.hash(req.body.password,salt)



// Create a new user
    user = await User.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
      });

    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data,jwt_secret)
    success = true;
    res.json({success,authtoken})

    } catch (error) {
    console.log(error.message)
    res.status(500).send('Some error occured')
    }

})

//--------------------------- ROUTE-2 --------------------------- 
//Authentication for Login POST "/auth/login"
router.post('/login',[
    body('email','Enter valid email').isEmail(),
    body('password','Password must be minimum 6 characters').exists(),
], 

async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error:"This email does not exists"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error:"Invalid Password"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,jwt_secret)
        success = true;
        res.json({success,authtoken})

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Some error occured')
    }

})

//--------------------------- ROUTE-3 --------------------------- 
//Get user details of logged in user POST "/auth/getuser"


router.post('/getuser', fetchuser ,async (req,res)=>{

try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password')
    res.send(user)

} catch (error) {
    console.log(error.message)
    res.status(500).send('Some error occured')
}
})

module.exports = router;

