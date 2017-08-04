//const MongoClient = require("mongodb").MongoClient;


const {MongoClient,ObjectID} = require("mongodb");// get more than one out


/* example of destructoring 
var user={name:"ANDREW",AGE:25};
var {name} = user;
console.log(name);
*/


MongoClient.connect("mongodb://localhost:27017/TodoApp" ,(error,db)=>{
    
    if (error)
        return console.log("Unable to connect to mongo db");

    console.log("connected");

   /* db.collection("todos").insertOne({
        text:"something else to do",
        completed:false
    },(error,result)=>{
        if (error)
            return console.log("error unable to accept todo",err);
        
        console.log(JSON.stringify(result.ops,null,2));
    });
*/
    // insert new doc into the users

    // db.collection("users").insertOne({
    //     name:"Mike McDaid",
    //     age:40,
    //     location:"Prenton"
    // },(error,result)=>{
    //     if (error)
    //         return console.log("error unable to accept todo",err);
        
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),null,2));

    // });

    db.close();
});