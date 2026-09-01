import User from "../model/user_model.js"
import jwt from "jsonwebtoken";

//handle errors

const handleerror=(err)=>{
    console.log(err.message,err.code);
    let error={email:"",password:""};
    //dublicated error
if(err.code===11000){
    error.email="email is already exists";
}
    //validation errors
if(err.message.includes('data validation failed')){
Object.values(err.errors).forEach(({properties})=>{
error[properties.path]=properties.message; 
})
};
//incorrect password
if(err.message==='incorrect password'){
    error.password='incorrect password'
}
//incorrect email
if(err.message==="email dosen't exist"){
    error.email=("email dosen't exist")
}


return error

}
 
//create JWT
const maxAge=7*24*60*60;
const createJwt=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,
        {
            expiresIn:maxAge
        }
    )
}


export const signUp_post=async(req,res)=>{

try{
    const{email,password,role}= req.body
    const user=new User({
    email,
    password,
    role
    })
await user.save();
console.log("saved");
const token =createJwt(user._id);
res.cookie("jwt",token,{
    httpOnly:true,
    maxAge:maxAge*1000
})
res.status(200).json(user._id);
}
catch(err){
    
    const errors=handleerror(err)
    console.log('dosent saved');
    
res.status(400).json(errors);
console.log(err.message);

}


}
export const signUp_get=(req,res)=>{
try{
    res.render('signup');
}
catch(err){
    res.status(400).send(err.message)
}


}
export const login_post=async(req,res)=>{
    try{

    
const {email,password,role}=req.body
const user=await User.login(email,password,role);
const token =createJwt(user._id);
res.cookie("jwt",token,{
    httpOnly:true,
    maxAge:maxAge*1000
})
res.status(200).json(user._id)
    }
    catch(err){
        const errors=handleerror(err)
        res.status(400).json(errors)
    }
}
export const login_get=(req,res)=>{
try{
    res.status(200).render('login');
   
}
catch(err){
    res.status(400).send(err.message)
}
}
export const logout_get=(req,res)=>{

}



