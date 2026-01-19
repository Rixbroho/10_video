const express= require('express');
const app=express();
const path=require('path');
const userModel=require('./models/user')

app.set("view engine", 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/read',async(req,res)=>{
    let user=await userModel.find()
    res.render('read',{user});
})

app.post('/create',async(req,res)=>{
    let {user_name,user_email,image_url}=req.body
    let createUser = await userModel.create({
        username:user_name,
        email:user_email,
        image:image_url
    });
    // console.log(createUser);
    res.redirect('/read')
})

app.get("/delete/:id",async (req,res)=>{
    let del =await userModel.findOneAndDelete({_id:`${req.params.id}`});
    res.redirect('/read')
})

app.listen(3000);  