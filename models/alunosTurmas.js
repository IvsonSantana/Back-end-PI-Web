const mongoose = require('mongoose');

const AlunosDisciplinasSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
    
});

module.exports = mongoose.model('AlunosDisciplinas', AlunosDisciplinasSchema);