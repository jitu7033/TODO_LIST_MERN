const mongoose = require("mongoose")

const conn = async(req,res)=>{

  try{
    await mongoose.connect("mongodb://localhost/todo_list")
    .then(()=>{
      console.log("connect")
    });
  }
  catch(err){
    res.status(400).json({
      message : "database is not connectd "
    })
  }
 
};

conn();

// const db = mongoose.connection;

// db.on("error",()=>{
//   console.log("error while connection the mongoDB")
// })
// db.once("open",()=>{
//   console.log("databases connected successfully ")
// })