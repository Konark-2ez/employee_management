const express = require('express');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const {userModel} = require("../model/user.model");
require("dotenv").config()
const userRouter = express.Router();

userRouter.get('/get',async(req,res)=>{
    try {
        const user = await userModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send(error)
    }
})

userRouter.post("/register",async(req,res)=>{
    const {email,password,confirmPassword} = req.body
    try {
        const hash =await  bcrypt.hash(password,5)
        const hashed =await  bcrypt.hash(confirmPassword,5)
        if(password===confirmPassword){
            const user = new userModel({email,password:hash,confirmPassword:hashed})
            await user.save()
            res.status(200).send({"msg":"Successfully created"})
        }
        else{
            res.status(300).send({"msg":"Password and Confirm Password donot match"})
        }
        
    } catch (error) {
        res.status(500).send({"msg":error.message});
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send("user doesnot exist")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).send("Password is wrong")
        }        
        const token = jwt.sign({userId:user._id},process.env.jwt)
        res.status(200).send({"msg":token})
    } catch (error) {
        res.status(200).send({"msg":error.message})
    }
})

module.exports = {userRouter}