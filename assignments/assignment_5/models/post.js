const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const post = new Schema({   
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });
const Post =  new mongoose.model("Post",post);
module.exports=Post;