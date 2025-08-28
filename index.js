import express from 'express';

const app = express() ;
const PORT = 3000 ;

app.use(express.json()) ;

const todoList = [{
    id : 1 ,
    task : 'Buy grocerires',
    completed : false
},
{
    id : 2 ,
    task : 'Clean the house',
    completed : true

}] ;

let nextid = 3 ;

app.listen(PORT ,() =>{
    console.log(`Server is running on port ${PORT}`) ;
})

//get all todo items and their status
app.get('/todo/getlist' , (req , res) =>{
      res.json(todoList) ;
})

//get a single todo item by id
app.get('/todo/:id' , (req , res) =>{
    const id = parseInt(req.params.id) ;
    const todoItem = todoList.find(item => item.id === id) ;
    if(todoItem){
        res.json(todoItem) ;
    }
    else{
        res.status(404).json({message : 'Todo item not found'});
    }
})

//add a new item to todo list
app.post('/todo/add' , (req , res) =>{
    const task = req.body.task ;
    if(!task){
        res.status(400).json({message : 'task is required'});
        return ;
    }
    todoList.push({
        id : nextid++ ,
        task : task ,
        completed : false
    })
     res.status(201).json(todoList[todoList.length -1]);
})


//if the do completed than update the status to completed
app.put('/todo/:id' , (req , res) =>{
    const id = parseInt(req.params.id) ;
    const todoItem = todoList.find(item => item.id === id) ;

    if(!todoItem){
        res.send(404).json({message : 'No such id exixts'}) ;
    }else{
        todoItem.completed = true ;
        res.status(200).json({message : 'Todo item updated succesFully'}) ;
    }
})
//delete a todo item by its id 
app.delete('/todo/:id' , (req , res) =>{

})