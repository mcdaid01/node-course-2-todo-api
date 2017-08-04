//const MongoClient = require("mongodb").MongoClient;
const {
    MongoClient,
    ObjectID
} = require("mongodb"); // get more than one out

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, db) => {

    if (error)
        return console.log("Unable to connect to mongo db");

    console.log("connected");

    // db.collection("Todos").find({
    //     _id:new ObjectID("59843ec19e071f3d9f8734ee")
    // }).toArray().then((docs) => {
    //     console.log("Todos");
    //     console.log(JSON.stringify(docs, null, 2));

    // }, (err) => console.log("unable to fetch todos", err));

    db.collection("todos").find().count().then((count) => {
        console.log("todos count:",count);
        

    }, (err) => console.log("unable to fetch todos", err));

    

    db.collection("users").find({"name" : "James"}).toArray().then((docs) => {
        console.log("users");
        console.log(JSON.stringify(docs, null, 2));

    }, (err) => console.log("unable to fetch todos", err));

    db.collection("todos").find({
    	_id:new ObjectID("59843ec19e071f3d9f8734ee")
    }).count().then((count) => {
         
         console.log("results found",count);

    }, (err) => console.log("unable to fetch todos", err));


    db.collection("todos").find({"completed" : false}).toArray().then((docs) => {
	    console.log("todos");
	    console.log(JSON.stringify(docs, null, 2));

	}, (err) => console.log("unable to fetch todos", err));

    db.close();
});
