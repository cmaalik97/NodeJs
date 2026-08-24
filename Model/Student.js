import mongoose from "mongoose";
import bcrypt from 'bcryptjs';



const StudentSchema=new mongoose.Schema({
    name:String,
    email:{type:String , unique:true} ,
    password:String,
    role:{type:String , 
        enum:['user' , 'admin'],
        default:'user'
    }

})

//hashed
StudentSchema.pre("save" , async function(next){
    if(!this.isModified("password"))return next()
    const salt= await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password ,salt)
})



StudentSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const Student =mongoose.model("Student" , StudentSchema)
export default Student;