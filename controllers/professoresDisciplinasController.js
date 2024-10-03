/*const ProfessoresDisciplina = require('../models/professoresDisciplinas');
const User = require('../models/userModels');

exports.getProfessoresDisciplina = async (req, res) => {
  try {
    const professoresDisciplinas = await ProfessoresDisciplina.find().populate('user').populate('disciplina');
    res.json(professoresDisciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessoresDisciplinaById = async (req, res) => {
  try {
    const professoresDisciplina = await ProfessoresDisciplina.findById(req.params.id).populate('user').populate('disciplina');
    if (!professoresDisciplina) {
      return res.status(404).json({ message: 'Professor ou Disciplina não encontrado' });
    }
    res.json(professoresDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfessoresDisciplina = async (req, res) => {
  try {
    const professoresDisciplina = new ProfessoresDisciplina(req.body);
    await professoresDisciplina.save();
    res.status(201).json(professoresDisciplina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProfessoresDisciplina = async (req, res) => {
  try {
    const professoresDisciplina = await ProfessoresDisciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!professoresDisciplina) {
      return res.status(404).json({ message: 'Professor ou Disciplina não encontrado' });
    }
    res.json(professoresDisciplina);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessoresDisciplina = async (req, res) => {
  try {
    await ProfessoresDisciplina.findByIdAndDelete(req.params.id);
    res.json({ message: 'Professor removido da disciplina' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessoresDisciplinaByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Verifique se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Encontre todas as disciplina associadas a esse usuário (professor)
      const professoresDisciplina = await AlunosTurma.find({ user: userId }).populate('disciplina').populate('user');
  
      if (professoresDisciplinas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma disciplina encontrada para esse professor' });
      }
  
      res.status(200).json(professoresDisciplina);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };*/