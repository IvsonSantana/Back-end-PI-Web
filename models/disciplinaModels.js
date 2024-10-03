const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },   
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);