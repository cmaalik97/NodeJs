import User from "../Model/User.js";
import { generateToken } from "../utility/generateToken.js";


export const getUsers=async (req,res )=>{
    const users=await User.find();
    res.send(users)
}

export const getOneUser= async (req, res)=>{
    const user= await User.findById(req.params.id)
    if(!user)return res.status(404).json("User not found")
    res.json(user)
}

export const updatUser=async (req , res)=>{
    const {id}=req.params
    try {
        const upadateUser= await User.findByIdAndUpdate(id, req.body , {new : true})
        if (!updatedUser) {return res.status(404).send('User not found');
        res.send(this.updatUser)
    }
    } catch (error) {
        res.status(500).send('Server error');
    }  
}


export const postUser= async (req , res)=>{
    const user= new User(req.body)
    //const user= new User({name: req.body.name , email:req.body.email} )
    const saved=await user.save();
   res.status(201).json(saved);
  
}


export const deleteUser=async (req,res)=>{
    const {id} = req.params;
    try {
        const deletedUser=await User.findByIdAndDelete(id)
        if(!deletedUser)return res.status(404).send("user not found")
        res.send(User)
    } catch (error) {
        res.status(500).send("server error")
    }

    
   
}

//realy crud
//rigester
export const register=async (req , res , next)=>{
    let {name , password , email , role}= req.body;
    try {
        email=email.toLowerCase();
        const exist=await User.findOne({email})

        if(exist)return res.status(400).json({message : "Email is already exisist"})
        
        const user=await User.create({name , email , password , role})
        const token=generateToken(user._id)
        res.status(201).json({token});
        
    } catch (err) {
        next(err)
    }
}


//login
export const login= async (req , res , next)=>{
      let {name , password , email}= req.body;
        try {
         const user = await User.findOne({ email });
         if (!user || !(await user.comparePassword(password))) {
         return res.status(401).json({ message: 'Invalid email or password' });
    }
      
    const token = generateToken(user._id);
    res.json({ token });
        
    } catch (err) {
        next(err)
    }

}