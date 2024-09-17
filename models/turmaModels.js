const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  ano: {type: Number, required: true},
  semestre:{type: String, required: true},
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Turma', TurmaSchema);