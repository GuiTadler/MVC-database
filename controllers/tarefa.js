const Tarefa = require('../models/Tarefa');
const tarefas = [];

exports.getTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.find();
    res.render('tarefas', { tarefas });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro na conexão")
  }
}

exports.createTarefas = async (req, res) => {
  const { text } = req.body;

  try {
    await Tarefa.create({ text });
    res.redirect('/'); // Redireciona para a página raiz
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.updateTarefas = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const update = { text: req.body.text };

    await Tarefa.findOneAndUpdate(filter, update);
    req.flash('success_msg', 'Tarefa atualizada com sucesso');
    res.redirect('/'); // Redireciona para a página raiz
  } catch (err) {
    req.flash('error_msg', 'Erro ao atualizar tarefa');
    res.redirect('/'); // Redireciona para a página raiz
  }
};

exports.deleteTarefas = async (req, res) => {
  try {
    const id = req.body.id;
    await Tarefa.findByIdAndRemove(id);
    res.redirect('/'); // Redireciona para a página raiz
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};





