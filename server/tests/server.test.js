const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe("Patch /todos/:id",()=>{
  it("should update the todo",(done)=>{
    const hexId = todos[0]._id.toHexString();
    const text = "is updated";
    // update text, set completed true

    request(app)
      .patch(`/todos/${hexId}`)
      .send({text,completed:true})
      .expect(200)
      .expect((res) => {

        const todo=res.body.todo;

        expect(todo.text).toBe(text);
        expect(todo.completed).toBe(true);
        expect(todo.completedAt).toBeA("number");
        
        
      }).end(done);

    // 200

    // responce body text changed, completed is true, completedAt is a number
  });

    it("should clear completedAt when todo is not completed",(done)=>{
      const hexId = todos[1]._id.toHexString();
      const text = "changed text";

      request(app)
        .patch(`/todos/${hexId}`)
        .send({text,completed:false})
        .expect(200)
        .expect((res)=>{
          const todo=res.body.todo;

          expect(todo.text).toBe(text);
          expect(res.body.completedAt).toNotExist();

        }).end(done);

    });

});


describe("GET /users/me", ()=>{
  
  it ("should return user if authenticated", (done)=>{
    request(app)
      .get("/users/me")
      .set("x-auth",users[0].tokens[0].token)
      .expect(200)
      .expect((res)=>{
        const body=res.body;
        expect(body._id).toBe(users[0]._id.toHexString());
        expect(body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it ("should return a 401 if not authenticated", (done)=>{
    request(app)
      .get("/users/me")
      .expect(401)
      .expect((res)=>{
        expect(res.body).toEqual({});
      })
      .end(done);
  });


});

describe('POST /users',()=>{
  
  
  it("should create a new user",(done)=>{
    
    const email = "example@example.com";  
    const password = "123mnb!";

    request(app)
      .post("/users")
      .send({email,password})
      .expect(200)
      .expect((res)=>{
        
        const body=res.body;
        expect(body._id).toExist();
        expect(body.email).toBe(email);
      })
      .end((err)=>{
        if (err)
          return done(err);

        // actually check the database for the new user
        User.findOne({email}).then((user)=>{
          expect(user).toExist();
          expect(user.password).toNotBe(password);// checks if hashed
          done();
        });
      });
  });

   it("should return validation error if request invalid",(done)=>{
    // send invalid email and password
    request(app)
      .post("/users")
      .send({
        email:"email",
        password:"123"
      })
      .expect(400)
      .end(done);

   });

  it("should not create user if email in use",(done)=>{
    request(app)
      .post("/users")
      .send({email:users[0].email,password:users[0].password}) // use the seed data
      .expect(400)
      .end(done);
  });


});
