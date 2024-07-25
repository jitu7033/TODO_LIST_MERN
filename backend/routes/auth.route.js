
const router = require("express").Router();
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

// register 

router.post("/register",async(req,res)=>{
  try{

    const{email,username,password} = req.body;
    const hashpassword = bcrypt.hashSync(password,8);
    const user = new User({email,username,password: hashpassword}); 
    await user.save().then(()=>{
      res.status(200).json({message : "Sign up successfully "})
      console.log(user)
    })
  }
  catch(error){
    res.status(200).json({
      message : "User already exist please enter new user name"
    })
    console.log(error)
  }
})

// login 
router.post("/signin",async(req,res)=>{
  try{
    const user = await User.findOne({email: req.body.email})
    if(!user){
      return res.status(400).send({
        message : "user not found"
      })
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password);

    if(!isPasswordCorrect){
      return res.status(400).send({
        message : "pass is not correct "
      })
      
    }

    const {password, ...others} = user._doc  // whitout pass giving all thing 
    res.status(200).json(others);
  }
  catch(error){
    console.log(error)
    res.status(200).json({
      message : "user not found"
    })
  }
})

module.exports = router;
