const mongoose = require('mongoose');

const AlunosTurmasSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
    
});

module.exports = mongoose.model('AlunosTurmas', AlunosTurmasSchema);