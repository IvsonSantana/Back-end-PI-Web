const mongoose = require('mongoose');

const ConceitoSchema = new mongoose.Schema({
    aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
    conceito1: { type: Number},
    conceito2: { type: Number},
    conceitoParcial: { type: Number},
    conceitoRec: { type: Number},
    conceitoFinal: { type: Number},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conceito', ConceitoSchema);