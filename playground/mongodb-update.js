const {
    MongoClient,
    ObjectID
} = require("mongodb"); // get more than one out

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {

    if (error)
        return console.log("Unable to connect to mongo db");

    console.log("connected");


    // find one and update
    // db.collection("todos").findOneAndUpdate({
    //     _id: new ObjectID("598492599e071f3d9f874896")
    // }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     // actually gets the document back
    //     console.log(result);
    // });

    db.collection("users").findOneAndUpdate({
        name: "Mike"
    }, {
        $set: { name: "James" }, // set name to James
        $inc: {age:1} // increment age by 1
    }, {
        returnOriginal: false
    }).then((result) => {
        // actually gets the document back
        console.log(result);
        db.close();
    });

    //db.close();
});
