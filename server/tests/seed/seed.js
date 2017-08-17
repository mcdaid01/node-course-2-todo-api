const {ObjectID} = require('mongodb');
const jwt = require("jsonwebtoken");

const {Todo} = require("./../../models/todo");
const {User,secret} = require("./../../models/user"); // course does not do secret

const userOneId=new ObjectID();
const userTwoId=new ObjectID();

const users= [{
    _id: userOneId,
    email:"mike@example.com",
    password: "password1",
    tokens:[{
        access:"auth",
        token: jwt.sign( { _id : userOneId, access:"auth" },secret).toString()
    }]
},{
    id:userTwoId,
    email:"tom@example.com",
    password:"password2"
}];

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  }, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed:true,
    completedAt:333
  }];

  const populateTodos = (done) => {
    Todo.remove({}).then(() => {
      return Todo.insertMany(todos);
    }).then(() => done());
  };
  
const populateUsers = (done) =>{
    User.remove({}).then(()=>{ // wipe all

        // need to use save rather than loop, so that the middleware is called and password hashed
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        // promise,all wait for both promises to be fulfilled
        return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};

  module.exports = {todos,populateTodos,users,populateUsers};