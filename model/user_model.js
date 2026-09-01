import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter a  email"],
        unique:true,
        validate:[validator.isEmail,"please enter a valid email"]

    },
    password:{
        type:String,
 required:[true,"please enter a  password"],
 minlength:[6,"please enter at least 6 characters"]
    },
      
      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
   
})
userSchema.pre('save',async function(){
    const salt=await bcrypt.genSalt();
this.password=await bcrypt.hash(this.password,salt)

})
userSchema.statics.login=async(email,password)=>{
  const user=await User.findOne({email});
  if(user){
    const pass= await bcrypt.compare(password,user.password)
    if(pass){
        return user
    }
    throw Error ('incorrect password')
  }
  throw Error ("email dosen't exist")
   
}
const User=mongoose.model("data",userSchema)
export default User;
