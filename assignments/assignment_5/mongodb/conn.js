const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/instagram", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("database connected");
}).catch((e)=>{
    console.log("Connection Unsuccesful");
})