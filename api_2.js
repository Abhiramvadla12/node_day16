let express = require("express");
let app = express()
let fs = require("fs");
let cors = require("cors");
app.use(cors());
app.get("/",(req,res)=>{
    fs.readFile('./data_store.json',"utf-8",(err,data)=>{
        if(err){
            res.send(err.message);
        }
        else{
            console.log("checking the data:",JSON.parse(data));
            res.send(JSON.parse(data));
        }
    })

});
let port = 3001;
app.listen(port,()=>{
    console.log(`server has started http://localhost:${port}`);
})
