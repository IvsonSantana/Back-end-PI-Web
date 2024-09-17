const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: {type: String, required: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);