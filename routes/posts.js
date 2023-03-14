const express = require("express")
const router = express.Router()
const User = require("../models/User");
const Post = require("../models/Post");

// Createpost
router.post("/", async(req, res)=>{
    const newPost = new Post(req.body);

    try{
       const savedPost = await newPost.save();
       res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})


//Update post
router.put("/:id", async(req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                },{new: true})
                res.status(200).json(updatedPost)
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
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.deleteOne()
                res.status(200).json("post has been deleted")
            }catch(err){
                res.status(500).json(err)
            }
        }else{
            res.status(401).json("can't del this post") 
        }

    }catch(err){
        res.status(500).json(err)
    }
})



//Get post
router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

// Get all posts
router.get("/", async (req, res)=>{
    const username = req.query.user;
    try{
        let posts;
        if(username){
            posts = await Post.find({username})
        }else{
            posts = await Post.find()
            .sort({createdAt: -1})
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
})
 
module.exports = router
 