const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  ano: {type: String, required: true},
  serie: {type: String, enum: ['1º Ano','2º Ano','3º Ano'] ,required: true}, 
  aluno: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  disciplinas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' }],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Turma', TurmaSchema);