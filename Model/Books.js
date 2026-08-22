const mongoose = require("mongoose")


const BooksSchema= new mongoose.Schema ({
    title:String,
    Auth:String,
    publishedYear:Number
})

module.exports=mongoose.model("Books" , BooksSchema)



