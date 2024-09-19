const mongoose = require('mongoose');

const ConceitoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
    conceito1: { type: number},
    conceito2: { type: number},
    conceitoParcial: { type: number},
    conceitoRec: { type: number},
    conceitoFinal: { type: number},
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conceito', ConceitoSchema);