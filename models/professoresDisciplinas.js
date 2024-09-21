const mongoose = require('mongoose');

const ProfessoresDisciplinasSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true},
});

module.exports = mongoose.model('ProfessoresDisciplinas', ProfessoresDisciplinasSchema);