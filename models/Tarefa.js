const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('tarefas', TarefaSchema);
