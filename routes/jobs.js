const express = require("express")
const router = express.Router()
const User = require("../models/User");
const Job = require("../models/Job");

// Createpost
router.post("/", async(req, res)=>{
    const newJob = new Job(req.body);

    try{
       const savedJob = await newJob.save();
       res.status(200).json(savedJob)
    }catch(err){
        res.status(500).json(err)
    }
})


//Update post
router.put("/:id", async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(job.username === req.body.username){
            try{
                const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },{new: true})
                res.status(200).json(updatedJob)
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("not your post") 
        }

    }catch(err){
        res.status(500).json(err)
    }
})



// Delete
router.delete("/:id", async(req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(job.username === req.body.username){
            try{
                await job.deleteOne()
                res.status(200).json("post has been deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("cant del this job") 
        }

    }catch(err){
        res.status(500).json(err)
    }
})



//Get post
router.get("/:id", async (req, res)=>{
    try{
        const job = await Job.findById(req.params.id);
        res.status(200).json(job)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get all jobs
router.get("/", async (req, res)=>{
    const username = req.query.user;
    try{
        let jobs;
        if(username){
            jobs = await Job.find({username})
        }else{
            jobs = await Job.find()
            .sort({createdAt: -1})
        }
        res.status(200).json(jobs)
    }catch(err){
        res.status(500).json(err)
    }
})
 
module.exports = router
 