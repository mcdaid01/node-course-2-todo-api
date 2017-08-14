const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // using mongoose own promise library
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI ||  "mongodb://localhost:27017/TodoApp",{
    useMongoClient: true
});


module.exports ={ mongoose };