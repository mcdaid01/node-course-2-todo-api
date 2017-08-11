const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

const port = process.env.PORT || 3001;


const app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
    console.log(req.body);
    const todo = new Todo({
        text:req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});


app.listen(port,()=>{
    console.log("listening on",port);    
});


module.exports = {app}; // need for testing


