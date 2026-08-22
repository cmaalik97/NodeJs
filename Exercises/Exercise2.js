///Exercise 2

`
------------------------------
Routes
-----------------
const express=require('express');
const { getBooks, createBook, updateBook, deleteBook, getOneBook } = require('../Controllers/BookController');
const router=express.Router();

router.get('/', getBooks)
router.post('/' , createBook)
router.put('/:id' , updateBook)
router.delete('/:id', deleteBook)
router.get('/:id',getOneBook)

module.exports=router;

----------------------------------------------
Models
------------------
const mongoose = require("mongoose")


const BooksSchema= new mongoose.Schema ({
    title:String,
    Auth:String,
    publishedYear:Number
})

module.exports=mongoose.model("Books" , BooksSchema)
----------------------------------------
Controllers
----------------

const Books=require("../Model/Books.js")

exports.getBooks=async (req , res)=>{
    const books=await Books.find();
    res.json(books)
}

exports.createBook=async (req, res)=>{
    const book= new Books(req.body)
    const saved=await book.save();
    res.status(201).json(saved)
}


exports.updateBook=async (req , res)=>{
    const {id}=req.params;
    try {
        const updatebook= await Books.findByIdAndUpdate(id , req.body , {next : true})
        if(!updatebook)return res.status(404).json("Not found User")
        res.json(updatebook)
        
    } catch (error) {
        res.json(error)
    }
    
}


exports.deleteBook=async (req, res)=>{
    const {id} = req.params;
    try {
        const deletedBook= await Books.findByIdAndDelete(id)
        if(!deletedBook)return res.status(404).json("Not found Users")
        res.send(`//user deleted with this id ${id}`)
    //} catch (error) {
       // res.json(error)
      //  console.log("err" , error)
    //}
//}

//exports.getOneBook=async (req , res)=>{
//     const {id}= req.params;
//     try {

//         const OneBook= await Books.findById(id)
//         if(!OneBook)return res.status(404).json("Not found")
//         res.json(OneBook)
        
//     } catch (error) {
//         res.json(error)
//     }
// }
// ---------------------------------

// the main
// -------------
// const mongoose = require("mongoose");
// const express = require("express");
// const booksRoutes = require("./Routes/book");

// require("dotenv").config();

// const app = express();
// const PORT=process.env.PORT || 5000;

// app.use(express.json());

// app.get('/test', (req, res) => {
//     res.send('Express server is working!');
// });

// app.use("/", booksRoutes);



// //connect to mongodb
// mongoose.connect(process.env.MONGO_URI)
//     .then(()=>console.log("✅ MongoDB connected"))
//     .catch((err)=>console.log("❌ connection error:" , err))


//app.listen(PORT , ()=>{
    // console.log(`//server is running on http://localhost:${PORT}`)
//})



