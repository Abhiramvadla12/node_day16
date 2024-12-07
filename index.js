const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
app.use(express.urlencoded({extended:true}));
let store = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,__dirname+"/anime");
    },
    filename:(req,file,callback)=>{
        callback(null,`anime is ${file.originalname}`);
    }
})
let upload = multer({storage:store});
app.get("/anime",upload.single("file"),(req,res)=>{
    res.status(200).send({
        file:req.file,
        data:req.body
    });
});
app.post("/register",upload.single("file"),async(req,res)=>{
    let salt = 10;
    let hash_pas = await bcrypt.hash(req.body.password,salt);
    var obj = {
        username:req.body.username,
        password:hash_pas,
        email:req.body.email,
        profilepic:req.file.path,
    }
    console.log(obj);
    fs.writeFile("./data_store.json",JSON.stringify(obj),(err)=>{
        if(err){
            res.send(err.message);
        }
        else{
            res.status(200).sendFile(path.join(__dirname, "success.html"));
        }
    })
    // res.send({
    //     status:200,
    //     userdata:obj,
    //     message:"hi successful!!!!",
    // })
    
    
})



let port = 3000;
app.listen(port,()=>{
    console.log(`server has started at http://localhost:${port}`);
});