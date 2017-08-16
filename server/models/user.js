const mongoose =  require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const secret = "abc123";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim:true,
        minlength:1,
        unique:true,
        validate:{
            validator: validator.isEmail,
            message:"{value} is not a valid email address"
        }
    },
    password:{
        type:String,
        require:true,
        minlength: 6
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject(); // mongoose method turns model to normal object

    return _.pick(userObject,["_id","email"]);
};

// want to bind this keyword hence normal function
UserSchema.methods.generateAuthToken = function(){
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id:user._id.toHexString(),access},secret).toString();

    user.tokens.push({access,token});


    return user.save().then(() => {
        return token;
      });
};

const User = mongoose.model("User",UserSchema);

module.exports = { User };
