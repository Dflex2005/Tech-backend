const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true  
    },
    desc:{
        type:String,
        required:true,
    },
    summary:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    }, 
    name:{
        type:String,
    },
    avatar:{
        type:String,
    },
    cloudinary_id:{
        type:String,
    }
},
 {timestamps:true}
 );

 module.exports = mongoose.model("Post", PostSchema)