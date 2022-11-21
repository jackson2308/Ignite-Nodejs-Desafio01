const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;
  
  let userExist = users.some(user => user.username === username);
  if (!userExist) return response.status(404).send({error: 'Usuário não encontrado'})
  let userData = users.find(user => user.username === username )
  request.user = userData
  next();
}

app.post("/users", (request, response) => {
  const { name } = request.body;

  const { username } = request.body;

  const existUser = users.some(user => user.username === username)
  if(existUser) return response.status(400).json({error: 'username já está em uso!'})

  const user = {
    id: uuidv4(),
    name:name,
    username: username,
    todos: []
  };

  users.push(user);

  response.status(201).json(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { user } = request;
  
  response.json(user.todos)
  
});

app.post("/todos", checksExistsUserAccount, (request, response) => {

  const { user } = request;

  const { title } = request.body;

  const { deadline } = request.body;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  response.status(201).json(todo);

});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
   const { user } = request;

   const { title } = request.body;

   const { deadline } = request.body;

   const { id } = request.params;

   user.todos.forEach(todo => {
      if (todo.id === id) {
        todo.title = title;
        todo.deadline = new Date(deadline);
        return response.json(todo);
      }
  });

   return response.status(404).json({error: 'Tarefa não encontrada'});

});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const { id } = request.params;

   user.todos.forEach(todo => {
      if (todo.id === id) {
        todo.done = true;
        return response.json(todo);
      }
  });

   return response.status(404).json({error: 'Tarefa não encontrada'});
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { user } = request;

  const { id } = request.params;

   user.todos.forEach(todo => {
      if (todo.id === id) {
        user.todos.splice(todo, 1)
        return response.status(204).json()
      }
  });

   return response.status(404).json({error: 'Tarefa não encontrada'});
});

module.exports = app;
