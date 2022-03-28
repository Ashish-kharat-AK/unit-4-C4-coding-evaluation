const express = require("express");
const Todo = require("../models/todo.model");
const router = express.Router();

//creating crud operation for todo

router.get("", async (req, res) => {
    try {

        const todo = await Todo.find().lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post("", async (req, res) => {
    try {

        const todo = await Todo.create(req.body);
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.get("/:id", async (req, res) => {
    try {

        const todo = await Todo.find(req.params.id).lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(401).send({ message: err.message })
    }
});


router.patch("/:id", async (req, res) => {
    try {

        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(401).send({ message: err.message })
    }
});

router.delete("/:id", async (req, res) => {
    try {

        const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(201).send(todo);
    } catch (err) {
        return res.status(401).send({ message: err.message })
    }
});

//to get all the todos of a particu;lar userId;
router.get("/:userId/todos",async(req,res)=>{
    try{
        const todo = await Todo.find(req.params.userId).lean().exec();
        return res.status(200).send(todo);
    }catch(err){
        return res.status(500).send({message:err.message});
    }

})

module.exports = router;