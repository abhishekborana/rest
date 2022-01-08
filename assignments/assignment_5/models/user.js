const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt =require("jsonwebtoken");
const user = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
  });

  //token
user.methods.generateAuthToken = async ()=>{
    try{
        const token = jwt.sign({_id:this._id},"sceret");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }   
    catch(err){
        console.log("error token not genereted "+err);
    }
}

const User =  new mongoose.model("User",user);
module.exports=User;