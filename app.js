const express = require('express');
const tarefa = require('./controllers/tarefa');
const app = express();
const moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');

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

// Sessao
app.use(session({
    secret:"MVC-EXPRESS-NODE",
    resave: true,
    saveUninitialized: true
}))

// Configuração do Express
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

// Middleware
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error =req.flash("error")
    res.locals.user = req.user || null;
    res.locals.moment = moment;
    next();
});

app.get('/', tarefa.getTarefas);
app.post('/', tarefa.createTarefas);
app.post('/:id/update', tarefa.updateTarefas);
app.post('/:id/delete', tarefa.deleteTarefas);

