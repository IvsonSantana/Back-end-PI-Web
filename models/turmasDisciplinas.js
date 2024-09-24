const mongoose = require('mongoose');

const TurmaDisciplinasSchema = new mongoose.Schema({
    turma: { type: mongoose.Schema.Types.ObjectId, ref: 'Turma', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
});

module.exports = mongoose.model('TurmaDisciplinas', TurmaDisciplinasSchema);