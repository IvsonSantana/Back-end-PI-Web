const Turma = require('../models/turmaModels');

exports.getTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find();
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTurmaById = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTurma = async (req, res) => {
    try {
      const turma = new Turma(req.body);
      await turma.save();
      res.status(201).json(turma);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

exports.updateTurma = async (req, res) => {
  try {
    const turma = await Turma.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTurma = async (req, res) => {
  try {
    await Turma.findByIdAndDelete(req.params.id);
    res.json({ message: 'Turma deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
