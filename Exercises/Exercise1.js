(`
const express= require('express');
const { title } = require('node:process');
const app=express()
const PORT=5000;

app.use(express.json())

let Books=[
    {id:1 , title:" Atomic Habits" , auth:"James Clear"},
    {id:2 , title:"Deep work" , auth:"Cal Newport"}
];

//get all books
app.get('/Books',(req , res)=>{
    res.send(Books)
})

//get one book
app.get('/Books/:id',(req , res)=>{
    const book=Books.find(b => b.id == req.params.id)
    if(!book){res.status(404).json("not found")}
    res.json(book)
})

//post
app.post('/Books', (req, res)=>{
    const newBook={id: Books.length +1 ,
         title:req.body.title, 
         auth:req.body.auth}
         Books.push(newBook);

         res.status(201).json(newBook)

})
//put
app.put('/Books/:id' , (req,res)=>{
     book=Books.find(b => b.id == req.params.id)
       
    if(!book){res.status(404).json("not found")}
    book.title=req.body.title
    book.auth=req.body.auth

    res.send(book)
    
})

//Delete
app.delete('/Books/:id' , (req, res)=>{
     Books=Books.filter(b=> b.id != req.params.id)
  
  
    
    res.send("User Deleted")

})
`)
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})


