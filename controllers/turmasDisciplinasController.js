/*const TurmasDisciplina = require('../models/turmasDisciplinas');
const Disciplina = require('../models/disciplinaModels');

exports.getTurmasDisciplina = async (req, res) => {
  try {
    const turmasDisciplinas = await TurmasDisciplina.find().populate('turma').populate('disciplina');
    res.json(turmasDisciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTurmasDisciplinaById = async (req, res) => {
  try {
    const turmasDisciplina = await TurmasDisciplina.findById(req.params.id).populate('turma').populate('disciplina');
    if (!turmasDisciplina) {
      return res.status(404).json({ message: 'Disciplina ou Turma não encontrada' });
    }
    res.json(turmasDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTurmasDisciplina = async (req, res) => {
  try {
    const turmasDisciplina = new TurmasDisciplina(req.body);
    await turmasDisciplina.save();
    res.status(201).json(turmasDisciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTurmasDisciplina = async (req, res) => {
  try {
    const turmasDisciplina = await TurmasDisciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!turmasDisciplina) {
      return res.status(404).json({ message: 'Disciplina ou Turma não encontrado' });
    }
    res.json(turmasDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTurmasDisciplina = async (req, res) => {
  try {
    await TurmasDisciplina.findByIdAndDelete(req.params.id);
    res.json({ message: 'Disciplina removida da turma' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTurmasDisciplinaByUserId = async (req, res) => {
    try {
      const { disciplinaId } = req.params;
  
      // Verifique se o usuário existe
      const disciplina = await Disciplina.findById(userId);
      if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada' });
      }
  
      // Encontre todas as disciplina associadas a esse usuário (professor)
      const turmasDisciplina = await TurmasDisciplina.find({ disciplina: disciplinaId }).populate('turma');
  
      if (turmasDisciplina.length === 0) {
        return res.status(404).json({ message: 'Nenhuma turma encontrada para esse disciplina' });
      }
  
      res.status(200).json(turmasDisciplina);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };*/