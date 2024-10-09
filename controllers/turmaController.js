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
    const turmaId = req.params.id; 
    const { alunosIds } = req.body; 
    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    turma.aluno = turma.aluno.filter(alunoId => !alunosIds.includes(alunoId.toString()));
    await turma.save();

    res.json({ message: 'Aluno(s) removido(s) da turma com sucesso', turma });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adicionarAlunos = async (req, res) => {
    const turmaId = req.params.turmaId; 
    const alunosParaAdicionar = req.body.aluno; 

    try {
        // Busca a turma pelo ID
        const turma = await Turma.findById(turmaId).populate('alunos'); 
        if (!turma) {
            return res.status(404).json({ message: 'Turma não encontrada.' });
        }
        const alunosExistentes = turma.alunos.map(aluno => aluno._id.toString());

        const novosAlunos = alunosParaAdicionar.filter(id => 
          !alunosExistentes.includes(mongoose.Types.ObjectId(id).toString())
      );

        if (novosAlunos.length > 0) {
            turma.alunos.push(...novosAlunos); 
            await turma.save();
            return res.status(200).json({ message: 'Alunos adicionados à turma com sucesso!' });
        } else {
            return res.status(400).json({ message: 'Todos os alunos já estão na turma.' });
        }
    } catch (error) {
        console.error('Erro ao adicionar alunos:', error);
        res.status(500).json({ message: 'Erro ao adicionar alunos.' });
    }
};

exports.addDisciplinasToTurma = async (req, res) => {
  try {
    const { id } = req.params; 
    const { disciplinas } = req.body; 

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de turma inválido' });
    }
    const turma = await Turma.findByIdAndUpdate(
      id,
      { $addToSet: { disciplinas: { $each: disciplinas } } },
      { new: true }
    ).populate('disciplinas'); 
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    res.json(turma);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunosTurma = async (req, res) => {
  const { turmaId } = req.params;

  try {
      
      const turmas = await Turma.findById(turmaId).populate('aluno');
      if (!turmas) {
          return res.status(404).json({ message: 'Turma não encontrada' });
      }

      res.status(200).json(turmas.aluno);
  } catch (error) {
      console.error('Erro ao buscar alunos da turma:', error);
      res.status(500).json({ message: 'Erro ao buscar alunos da turma.' });
  }
};

exports.deleteDisciplinasFromTurma = async (req, res) => {
  try {
    const { turmaId, disciplinasIds } = req.body; 
    const turma = await Turma.findById(turmaId);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    
    turma.disciplinas = turma.disciplinas.filter(
      disciplinaId => !disciplinasIds.includes(disciplinaId.toString())
    );
    await turma.save();

    res.json({ message: 'Disciplina(s) removida(s) da turma com sucesso', turma });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.attAlunoFromTurma = async (req, res) => {
  const { id } = req.params;
  const { alunos } = req.body;

  try {
      await Turma.findByIdAndUpdate(id, { $addToSet: { aluno: { $each: alunos } } });
      for (const alunoId of alunos) {
          await Disciplina.updateMany(
              { turma: id },
              { $addToSet: { aluno: alunoId } }
          );
      }

      res.status(200).json({ message: 'Alunos adicionados com sucesso.' });
  } catch (error) {
      console.error('Erro ao adicionar alunos:', error);
      res.status(500).json({ message: 'Erro ao adicionar alunos.' });
  }
};
