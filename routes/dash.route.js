const express = require('express');


const {dashModel} = require("../model/dashboard.model");

const dashRouter = express.Router();

dashRouter.get("/get",async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = 5;
        const skip = (page - 1) * limit;
    
        const employees = await dashModel.find().skip(skip).limit(limit);
        res.status(200).send(employees);
      } catch (error) {
        res.status(400).send({ "msg": error.message });
      }
})

dashRouter.post("/employee",async(req,res)=>{
    const {fname,lname,email,salary,deparment}= req.body
    try {
        const employee = new dashModel({fname,lname,email,salary,deparment})
        await employee.save()
        res.status(200).send({"msg":"Success"})
        
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

dashRouter.put("/employee/:id", async (req, res) => {
    const { fname, lname, email, salary, department } = req.body;
    try {
      const employee = await dashModel.findByIdAndUpdate(req.params.id, { fname, lname, email, salary, department }, { new: true });
      if (!employee) {
        return res.status(404).send({ "msg": "Employee not found" });
      }
      res.status(200).send({ "msg": "Employee updated successfully" });
    } catch (error) {
      res.status(400).send({ "msg": error.message });
    }
  });
  
  
  dashRouter.delete("/employee/:id", async (req, res) => {
    try {
      const employee = await dashModel.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).send({ "msg": "Employee not found" });
      }
      res.status(200).send({ "msg": "Employee deleted successfully" });
    } catch (error) {
      res.status(400).send({ "msg": error.message });
    }
  });

module.exports={dashRouter}