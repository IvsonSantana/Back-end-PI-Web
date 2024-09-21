const AlunosTurma = require('../models/alunosTurmas');
const User = require('../models/userModels');

exports.getAlunosTurma = async (req, res) => {
  try {
    const alunosTurmas = await AlunosTurma.find().populate('user').populate('turma');
    res.json(alunosTurmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunosTurmaById = async (req, res) => {
  try {
    const alunosTurma = await AlunosTurma.findById(req.params.id).populate('user').populate('turma');
    if (!alunosTurma) {
      return res.status(404).json({ message: 'Aluno ou Turma não encontrado' });
    }
    res.json(alunosTurma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAlunosTurma = async (req, res) => {
  try {
    const alunosTurma = new AlunosTurma(req.body);
    await alunosTurma.save();
    res.status(201).json(alunosTurma);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateAlunosTurma = async (req, res) => {
  try {
    const alunosTurma = await AlunosTurma.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alunosTurma) {
      return res.status(404).json({ message: 'Aluno ou Turma não encontrado' });
    }
    res.json(alunosTurma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAlunosTurma = async (req, res) => {
  try {
    await AlunosTurma.findByIdAndDelete(req.params.id);
    res.json({ message: 'Aluno removido da turma' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunosTurmaByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Verifique se o usuário existe
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
  
      // Encontre todas as turmas associadas a esse usuário (aluno)
      const alunoTurmas = await AlunosTurma.find({ user: userId }).populate('turma');
  
      if (alunoTurmas.length === 0) {
        return res.status(404).json({ message: 'Nenhuma turma encontrada para esse aluno' });
      }
  
      res.status(200).json(alunoTurmas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };