const Turma = require('../models/turmaModels');
const mongoose = require('mongoose');


exports.getTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find().populate('aluno').populate('disciplinas');
    res.json(turmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTurmaById = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id).populate('aluno').populate('disciplinas');
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

exports.deleteAlunosTurma = async (req, res) => {
  try {
    const { turmaId, alunosIds } = req.body; // Recebe o ID da turma e a lista de IDs dos alunos a serem removidos

    // Verifica se a turma existe
    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    // Filtra os alunos, removendo os que estão na lista de IDs a serem removidos
    turma.aluno = turma.aluno.filter(alunoId => !alunosIds.includes(alunoId.toString()));

    // Salva a turma atualizada
    await turma.save();

    res.json({ message: 'Aluno(s) removido(s) da turma com sucesso', turma });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAlunosToTurma = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID da turma
    const { alunos } = req.body; // Obtém os IDs dos novos alunos do corpo da requisição

    // Verifica se o ID da turma é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de turma inválido' });
    }

    // Atualiza a turma adicionando os alunos ao array existente
    const turma = await Turma.findByIdAndUpdate(
      id,
      { $addToSet: { aluno: { $each: alunos } } }, // Adiciona os novos alunos sem duplicar
      { new: true }
    );

    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addDisciplinasToTurma = async (req, res) => {
  try {
    const { id } = req.params; // ID da turma
    const { disciplinas } = req.body; // IDs das disciplinas a serem adicionadas

    // Verifica se o ID da turma é válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de turma inválido' });
    }

    // Atualiza a turma adicionando as disciplinas ao array existente
    const turma = await Turma.findByIdAndUpdate(
      id,
      { $addToSet: { disciplinas: { $each: disciplinas } } }, // Adiciona sem duplicar
      { new: true }
    ).populate('disciplinas'); // Popula para ver as disciplinas adicionadas

    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDisciplinasFromTurma = async (req, res) => {
  try {
    const { turmaId, disciplinasIds } = req.body; // ID da turma e lista de IDs das disciplinas a serem removidas

    // Verifica se a turma existe
    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    // Remove as disciplinas da turma
    turma.disciplinas = turma.disciplinas.filter(
      disciplinaId => !disciplinasIds.includes(disciplinaId.toString())
    );

    // Salva a turma atualizada
    await turma.save();

    res.json({ message: 'Disciplina(s) removida(s) da turma com sucesso', turma });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};