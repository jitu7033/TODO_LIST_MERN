const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email : {
    type  :  String,
    required : true,
    minLength : 15,
    unique : true
  },
  username : {
    type : String,
    required : true,
    unique : true
  },
  password :{
    type : String,
    required : true,
    minLength : 8
  },
  list : [{
    type : mongoose.Types.ObjectId,
    ref : "List",
  },
],
},{timestamps : true, versionKey : false})

module.exports = mongoose.model("User",userSchema)