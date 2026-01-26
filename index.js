import express from "express";
import dotenv from "dotenv";

dotenv.config(); 
const app = express()

const Port = process.env.PORT

app.get("/",(req, res)=>{
    res.send("Application is under development...")
})

app.get("/home",(req, res)=>{
    res.send("Welcome to My Home Page !")
})

app.listen(Port,()=>{
    console.log(`server is running at port ${Port}`)
})