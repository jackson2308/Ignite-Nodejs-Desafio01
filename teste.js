/* app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
    const { user } = request;
 
    const { title } = request.body;
 
    const { deadline } = request.body;
 
    const { id } = request.params;
 
    const todobyId = user.todos.find(todo => todo.id === id);
 
    if(!todobyId) return response.status(404).send('Tarefa não encontrada!');
 
    todobyId.title = title;
 
    todobyId.deadline = deadline;
 
    response.json(todobyId);
 
 }); */



 let pessoas = [
    pessoa1 = {nome: "Jackson", idade: 31},
    pessoa2 = {nome: "João", idade: 40}
 ]

 pessoas.splice(pessoa1, 1)
 console.log(pessoas)