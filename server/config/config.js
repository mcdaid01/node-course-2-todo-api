var env = process.env.NODE_ENV || "development";

if (env === "development" || env === "test"){
    const config = require("./config.json");
    const envConfig = config[env];
    Object.keys(envConfig).forEach( (key)=> {
        process.env[key]=envConfig[key];
    });
}
// set up enviroment variables meaning using different database for testing and development
// means on heruku will use the heroku (set there)
