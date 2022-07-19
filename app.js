const express = require('express')
const app = express()
const port = 4000

var bodyParser = require('body-parser')
app.use(bodyParser.json());

var todos = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/todos', (req, res)=>{
    res.send(todos)
})

app.post('/todos', (req, res)=>{
    const todo = req.body;
    console.log(req.body);

    if(todo.text === undefined) return res.status(400).send("JSON does not contain text property")
    
    let newTodo = {
        text: todo.text,
        checked: false
    }
    todos.push(newTodo);
    res.send("todo added");    
})

app.put('/todo', (req, res)=>{
    if (req.body.index === undefined) return res.status(400).send("JSON does not contain index property")
    todos[req.body.index].checked = !todos[req.body.index].checked

    res.send("Toddo status toggled")
})

app.delete('/todo', (req, res)=>{
    if (req.body.index === undefined) return res.status(400).send("JSON does not contain index property")

    let filterCriteria = todos[req.body.index].text
    todos = todos.filter(todo => todo.text != filterCriteria)  //builds new array without the one we are removing
    res.send("todo removed")
})

app.delete('/todos', (req, res)=>{
    todos = []
    res.send("todos cleared")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})