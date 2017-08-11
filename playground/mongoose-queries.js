const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");
const {ObjectID} = require("mongodb");

const id="598d6eac57b8e6111d057a68aa";
const userId="5989c05163b0796481be5800";


if (false){ // working with todos

    Todo.find({
        _id:id // note converts string to object id
    }).then((todos)=>{
        console.log("Todos",todos); // is an array
    });

    Todo.findOne({
        _id:id // note converts string to object id
    }).then((todo)=>{
        console.log("Todos",todo); // just one object
    });

    // this one deals with null being returned if no object exists with the id
    // the catch would get if the id was invalid for example too many characters
    Todo.findById(id).then((todo)=>{ // best one for this case
        if (!todo)
            return console.log("id not found");
        console.log(todo);
    }).catch((e)=> console.log(e));

}


if (!ObjectID.isValid(userId))
    return console.log("ID not valid");

User.findById(userId).then((user)=>{ // best one for this case
    if (!user)
        return console.log("user not found");
        console.log(JSON.stringify(user,null,2));
}).catch((e)=> console.log(e));