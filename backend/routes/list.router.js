const router = require("express").Router();
const User = require("../models/user.model")
const List = require("../models/list.model")
const bcrypt = require("bcrypt");
const { response } = require("express");

// create task

router.post("/addTask",async(req,res)=>{
  try{
    const {title,body,id} = req.body;

    const existUser = await User.findById(id)
    
    if(existUser){
        const list = new List({title,body,user : existUser});
        await list.save().then(()=>res.status(200).json({list}));
        existUser.list.push(list);
        existUser.save();
    }
  }
  catch(error){
    console.log(error)
  }
});


// update data

router.put("/updateTask/:id",async(req,res)=>{
  try{
    const {title,body} = req.body;
    // const existUser = await User.findOne({email});
    const list  = await List.findByIdAndUpdate(req.params.id,{title,body})
    list.save().then(()=>res.status(200).json({
      message : "task updated"
    }));
  }
  catch(error){
    console.log(error);
  }
})
// delete 
router.delete("/deleteTask/:id",async(req,res)=>{
  try{
    const {id} = req.body;
    const existUser = await User.findByIdAndUpdate(
      id,
      {$pull:{list : req.params.id}
    });
    if(existUser){
      await List.findByIdAndDelete(req.params.id).then(()=>
        res.status(200).json({message : "delete successfully "}))
    }
  }
  catch(error){
    console.log(error);
  }
})

// get task
router.get("/getTask/:id",async(req,res)=>{
  try{
    const list = await List.find({user:req.params.id}).sort({createdAt : -1});
    if(list.length!==0){res.status(200).json({list : list});
    }
  }
  catch(error){
    console.log(error)
  }
})

module.exports = router
