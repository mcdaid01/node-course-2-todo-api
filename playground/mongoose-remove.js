const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");
const {User} = require("./../server/models/user");

// removes everything, does not get docs back
if (false)
    Todo.remove({}).then((result)=>{
        console.log(result);
    });

// this one gets the doc back after removing
//

if (false)
    Todo.findOneAndRemove({text:"some text"}).then((todo)=>{
        for (let i=0;i<5;i++) // for separation in the terminal
            console.log();

        console.log(todo);
    });

if (true)
    Todo.findByIdAndRemove('599168a518de392595b6f1fd').then((todo)=>{
        for (let i=0;i<5;i++) // for separation in the terminal
            console.log();

        console.log(todo);

    });