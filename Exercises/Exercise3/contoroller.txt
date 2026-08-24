import Student from "../Model/Student.js";

import { generateToken } from "../utility/generateToken.js";

//rigester
export const register=async (req , res , next)=>{
    let {name , password , email , role}= req.body;
    try {
        email=email.toLowerCase();
        const exist=await Student.findOne({email})

        if(exist)return res.status(400).json({message : "Email is already exisist"})
        
        const student=await Student.create({name , email , password , role})
        const token=generateToken(student._id)
        res.status(201).json({token});
        
    } catch (err) {
        next(err)
    }
}

//login
export const login= async (req , res , next)=>{
      let {name , password , email}= req.body;
        try {
         const student = await Student.findOne({ email });
         if (!student || !(await student.comparePassword(password))) {
         return res.status(401).json({ message: 'Invalid email or password' });
    }
      
    const token = generateToken(student._id);
    res.json({ token });
        
    } catch (err) {
        next(err)
    }

}
