const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");
const {User} = require("./models/user");

const {ObjectID} = require("mongodb");


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

app.get('/todos',(req,res)=>{
    Todo.find().then( (todos)=>{
        res.send({todos})
    },(e)=>console.log("caught",e) );
});

app.get("/todos/:id",(req,res)=>{
    //req.params
    const id=req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send({});
    
    Todo.findById(id).then((todo)=>{ // best one for this case
        if (!todo)
            return res.status(404).send({});
        console.log(todo);
        res.status(200)
            .send({todo});
    }).catch((e)=> res.status(400).send());
        
    return console.log("ID not valid");


    // validate id
        // respond 404, send empty body

    // query database using find by id
        // success
        // error
            // 400 - not valid
    
});

app.delete('/todos/:id',(req,res)=>{
    // get the id
    const id=req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findByIdAndRemove(id).then((todo)=>{
        if (!todo)
            return res.status(404).send();
        
            res.status(200)
            .send({todo});
        
    }).catch((e)=> res.status(400).send());

});


app.listen(port,()=>{
    console.log("listening on",port);    
});


module.exports = {app}; // need for testing


