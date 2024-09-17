const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true},
  login: { type: String, required: true, unique: true },
  email: {type: String, required: true, unique: true},
  emailResponsavel: {type: String, required: true, unique: true},
  senha: { type: String, required: true },
  dataNasc: { type: Date, required: true},
  created_at: { type: Date, default: Date.now }
});

AlunoSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

AlunoSchema.methods.comparePassword = function(senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = mongoose.model('Aluno', AlunoSchema);