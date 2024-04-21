const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0/Jazz").then(()=>console.log("Mongo Db Connected"));