const express = require("express");
const app  = express();

// Json data from forms
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//connecting to mongodb server which is my local
require("./mongodb/conn.js");

//two collections under database Instagram
const Register = require("./models/user");
const Post = require("./models/post");
const User = require("./models/user");
const { render } = require("ejs");

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get("/", (req,res)=>{
    res.render("index"); 
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.get("/signin",(req,res)=>{
    res.render("signin");
});
app.post("/signincheck", async (req,res)=>{
    const useremail = req.body.email;
    const userpassword = req.body.password;

    const databaseEmail = await User.findOne({email:useremail});
    const databasePassword = await User.findOne({password:userpassword});
    console.log(databasePassword);
    if((databasePassword===null)){
        res.send("Incorrect Password");
        res.render("signin");
    }
    else if((databaseEmail.email===useremail) && (databasePassword.password===userpassword)){
        res.render("home");
    }
    else{
        res.send("Incorrect Email");
    }
});

app.post("/user/data",async (req,res)=>{
    console.log(req.body.name);
    console.log(req.body.password);
    console.log(req.body.email);

    const saveuser= new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const token = await saveuser.generateAuthToken();
    console.log("token "+token);
    const saves = await saveuser.save();
    res.render("home");
});

app.post("/post/data" ,async(req,res)=>{
    await Post.create({
        title:req.body.title,
        body:req.body.body,
        image:req.body.image
    });
    console.log(await Post.findOne({body:req.body.body}));
    res.render("home");
});

app.get("/userpost",(req,res)=>{
    res.render("posts");
});
app.listen(4000,()=>{
    console.log("Connected Succesfully");
})