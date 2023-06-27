const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Task = require('./model/task');

// ENV com dados do Mongo
require('dotenv').config();

// Configuração do Mongoose
mongoose.set('strictQuery', true);

// Conecation MongoDB
const Schema = mongoose.Schema;
mongoose.connect(process.env.MONGO_DB,
{useNewUrlParser: true})
.then(()=>{
    console.log('Mongo conectado')
}).catch((err)=> {
    console.log('Erro ao conectar ao Mongo online')
});

// Porta de acesso
const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log('Escutando na porta: ' + PORT )
})

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
    Task.find({}, (err, tasks) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao buscar as tarefas.' });
      }
      res.json(tasks);
    });
  });
  
  // Rota para criar uma nova tarefa
  app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
  
    const task = new Task({
      title,
      description,
    });
  
    task.save((err, savedTask) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao criar a tarefa.' });
      }
      res.status(201).json(savedTask);
    });
  });
  
  // Rota para atualizar uma tarefa existente
  app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
  
    Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true },
      (err, updatedTask) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Erro ao atualizar a tarefa.' });
        }
        res.json(updatedTask);
      }
    );
  });
  
  // Rota para excluir uma tarefa
  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
  
    Task.findByIdAndRemove(id, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao excluir a tarefa.' });
      }
      res.sendStatus(204);
    });
  });