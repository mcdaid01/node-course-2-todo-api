require("./config/config");

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

const {
    mongoose
} = require("./db/mongoose");
const {
    Todo
} = require("./models/todo");
const {
    User
} = require("./models/user");
const {
    authenticate
} = require("./middleware/authenticate");

const {
    ObjectID
} = require("mongodb");


const port = process.env.PORT;


const app = express();

app.use(bodyParser.json());

app.post("/todos",authenticate, (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/todos',authenticate, (req, res) => {
    Todo.find({
        _creator:req.user._id
    }).then((todos) => {
        res.send({
            todos
        })
    }, (e) => console.log("caught", e));
});

app.get("/todos/:id",authenticate, (req, res) => {
    //req.params
    const id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send({});

    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo) => { // best one for this case
        if (!todo)
            return res.status(404).send({});
        console.log(todo);
        res.status(200)
            .send({
                todo
            });
    }).catch((e) => res.status(400).send());

    return console.log("ID not valid");


    // validate id
    // respond 404, send empty body

    // query database using find by id
    // success
    // error
    // 400 - not valid

});

app.delete('/todos/:id',authenticate, (req, res) => {
    // get the id
    const id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo) => {
        if (!todo)
            return res.status(404).send();

        res.status(200)
            .send({
                todo
            });

    }).catch((e) => res.status(400).send());

});

app.patch('/todos/:id',authenticate, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id))
        return res.status(404).send();

    const body = _.pick(req.body, ['text', 'completed']); // so user can't update anything but text and completed

    if (_.isBoolean(body.completed) && body.completed)
        body.completedAt = Date.now();
    else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _id:id,
        _creator:req.user._id
    }, {
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if (!todo)
            return res.status(404).send();

        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send();
    });
});


app.post("/users", (req, res) => {
    console.log(req.body);
    const body = _.pick(req.body, ['email', 'password']); // so user can't update anything but text and completed

    const user = new User(body);
    user.save().then((doc) => {
        return user.generateAuthToken();

    }).then((token) => {

        res.header("x-auth", token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get("/users/me", authenticate, (req, res) => {
    res.send(req.user);
});


app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete("/users/me/token", authenticate, (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    }),
    ()=>{
        res.status(400).send();
    };
});

app.listen(port, () => {
    console.log("listening on", port);
});


module.exports = {
    app
}; // need for testing
