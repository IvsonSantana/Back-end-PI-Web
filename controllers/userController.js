const User = require('../models/userModels');
const Turma = require('../models/turmaModels');
const Disciplina = require('../models/disciplinaModels'); 



exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { nome, login, matricula, password, email, tipo  } = req.body;
    const user = new User({ nome, login, matricula , password, email, tipo });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'Usuario não encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario deletado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessores = async (req, res) => {
  try {
    const professores = await User.find({ tipo: 'professor' });
    const disciplinas = await Disciplina.find({ professor: { $in: professores.map(prof => prof._id) } })
      .populate('turma', 'nome'); // Popula a turma para obter o nome
    
    const professoresComTurmasEDisciplinas = professores.map(professor => {
      const disciplinasDoProfessor = disciplinas.filter(disciplina => disciplina.professor.equals(professor._id));
      const turmasAssociadas = disciplinasDoProfessor.map(disciplina => ({
        _id: disciplina.turma._id,
        nome: disciplina.turma.nome,
      }));

      return {
        _id: professor._id,
        nome: professor.nome,
        turmas: Array.from(new Set(turmasAssociadas.map(turma => turma._id))), 
        disciplinas: disciplinasDoProfessor.map(disciplina => ({
          id: disciplina._id,  
          nome: disciplina.nome 
        }))
      };
    });

    res.json(professoresComTurmasEDisciplinas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCoordenadores = async (req, res) => {
  try {
    const coordenador = await User.find({ tipo: 'coordenador' });
    if (!coordenador) {
      return res.status(404).json({ message: 'Coordenador não encontrado' });
    }
    res.json(coordenador);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await User.find({ tipo: 'aluno' });
    const turmas = await Turma.find({ aluno: { $in: alunos.map(aluno => aluno._id) } })
      .populate('disciplinas', 'nome'); 

    const alunosComTurmas = alunos.map(aluno => {
      const turmaDoAluno = turmas.find(turma => turma.aluno.includes(aluno._id));
      return {
        _id: aluno._id,
        nome: aluno.nome,
        turma: turmaDoAluno 
          ? { 
              _id: turmaDoAluno._id, 
              nome: turmaDoAluno.nome,
              disciplinas: turmaDoAluno.disciplinas.map(disciplina => disciplina.nome) 
            } 
          : null, 
      };
    });

    res.json(alunosComTurmas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getProfessoresCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ tipo: 'professor' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAlunosCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ tipo: 'aluno' });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
