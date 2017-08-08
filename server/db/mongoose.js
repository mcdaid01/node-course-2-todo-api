const mongoose = require("mongoose");

mongoose.Promise = global.Promise; // using mongoose own promise library
mongoose.connect("mongodb://localhost:27017/TodoApp",{
    useMongoClient: true
});


module.exports ={ mongoose };