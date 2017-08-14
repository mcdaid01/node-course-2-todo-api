var env = process.env.NODE_ENV || "development";

// set up enviroment variables meaning using different database for testing and development
// means on heruku will use the heroku (set there)
if (env ==="development"){
    process.env.PORT = 3000;
    process.env.MONGODB_URI= "mongodb://localhost:27017/TodoApp";
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI= "mongodb://localhost:27017/TodoAppTest";
}