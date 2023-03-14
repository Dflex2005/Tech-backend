const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
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
},
 {timestamps:true}
 );

 module.exports = mongoose.model("Job", JobSchema)
