const { MongoClient, ObjectID } = require("mongodb"); // get more than one out

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {

    if (error)
        return console.log("Unable to connect to mongo db");

    console.log("connected");

    // deleteMany
    //db.collection("todos").deleteMany({text:"eat lunch"}).then((result)=>{
    //    console.log(result);
    //});

    // deleteOne
    //db.collection("todos").deleteOne({text:"eat lunch"}).then((result)=>{
    //    console.log(result);
    //});
    
    // findOneAndDelete
    db.collection("todos").findOneAndDelete({completed:false}).then((result)=>{
        // actually gets the document back
        console.log(result);
    });

    //db.close();
});
