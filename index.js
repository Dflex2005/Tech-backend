const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const jobRoute = require("./routes/jobs");
const multer = require("multer");
const path = require("path")
const cors = require("cors");

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  

const db = mongoose.connection;
// recover from errors
db.on('error', console.error.bind(console, 'connection error:'));

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_LINK, {
    // useserNewUrlParser: true,
    // useUnifiedTopology: true,

}).then(console.log("connected")).catch(err => console.log(err));

const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, "images")
    }, filename:(req,file, cb)=>{
        cb(null, req.body.name)
    }
})



//upload images
const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req, res)=>{
    res.status(200).json("file uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/jobs", jobRoute);

app.listen(PORT, ()=>{
    console.log("server running");
})


