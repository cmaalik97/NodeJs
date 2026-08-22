
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
        res.send(`user deleted with this id ${id}`)
    } catch (error) {
        res.json(error)
        console.log("err" , error)
    }
}

exports.getOneBook=async (req , res)=>{
    const {id}= req.params;
    try {

        const OneBook= await Books.findById(id)
        if(!OneBook)return res.status(404).json("Not found")
        res.json(OneBook)
        
    } catch (error) {
        res.json(error)
    }
}