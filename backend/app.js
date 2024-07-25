

const express = require("express")
const mongoose = require("mongoose")
const conn = require("./conn/conn")
const auth = require("./routes/auth.route")
const list = require("./routes/list.router")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
  res.send("hello")
})

app.use("/api/v1",auth)
app.use("/api/v2",list)


app.listen(8080,()=>{
  console.log("server start")
});
